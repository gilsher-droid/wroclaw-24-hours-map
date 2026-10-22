"""Build customer delivery mail from the original request. No network or sending.

CLI: pipe a private JSON envelope {request, access} through stdin. Output contains
credentials for the authorized sender only. Never log it or save it publicly.
"""
import hashlib
import html
import json
import re
import sys
from urllib.parse import urlsplit

COPY = {
    'he': {
        'subject': 'המפה האישית שלך לוורוצלב',
        'intro': 'המפה האישית שלך מוכנה. פרטי הכניסה מופיעים בהמשך.',
        'link': 'כניסה למפה:', 'username': 'שם משתמש:',
        'password': 'סיסמה זמנית:',
        'instructions': 'בכניסה הראשונה יש להזין את הסיסמה הזמנית, ולאחר מכן לבחור קוד אישי בן ארבע ספרות ולאשר אותו.',
        'privacy': 'המפה אישית. אין להעביר את פרטי הכניסה לאחרים.',
        'reference': 'מספר הבקשה:',
    },
    'en': {
        'subject': 'Your personal Wrocław map',
        'intro': 'Your personal map is ready. Your login details are below.',
        'link': 'Open your map:', 'username': 'Username:',
        'password': 'Temporary password:',
        'instructions': 'On your first visit, enter the temporary password, then choose and confirm a personal four-digit code.',
        'privacy': 'This map is private. Do not share your login details.',
        'reference': 'Request reference:',
    },
    'de': {
        'subject': 'Ihre persönliche Breslau-Karte',
        'intro': 'Ihre persönliche Karte ist fertig. Ihre Zugangsdaten finden Sie unten.',
        'link': 'Karte öffnen:', 'username': 'Benutzername:',
        'password': 'Vorläufiges Passwort:',
        'instructions': 'Geben Sie bei der ersten Anmeldung das vorläufige Passwort ein. Wählen und bestätigen Sie anschließend einen persönlichen vierstelligen Code.',
        'privacy': 'Diese Karte ist privat. Geben Sie Ihre Zugangsdaten nicht weiter.',
        'reference': 'Anfragenummer:',
    },
    'cs': {
        'subject': 'Vaše osobní mapa Vratislavi',
        'intro': 'Vaše osobní mapa je připravena. Přihlašovací údaje najdete níže.',
        'link': 'Otevřít mapu:', 'username': 'Uživatelské jméno:',
        'password': 'Dočasné heslo:',
        'instructions': 'Při prvním přihlášení zadejte dočasné heslo. Poté si zvolte a potvrďte osobní čtyřmístný kód.',
        'privacy': 'Tato mapa je soukromá. Své přihlašovací údaje nesdílejte.',
        'reference': 'Číslo žádosti:',
    },
    'pl': {
        'subject': 'Twoja osobista mapa Wrocławia',
        'intro': 'Twoja osobista mapa jest gotowa. Dane do logowania znajdziesz poniżej.',
        'link': 'Otwórz mapę:', 'username': 'Nazwa użytkownika:',
        'password': 'Hasło tymczasowe:',
        'instructions': 'Przy pierwszym logowaniu wpisz hasło tymczasowe. Następnie wybierz i potwierdź własny czterocyfrowy kod.',
        'privacy': 'Ta mapa jest prywatna. Nie udostępniaj danych do logowania.',
        'reference': 'Numer zgłoszenia:',
    },
}


def single_line(value):
    if not isinstance(value, str) or not value or any(ord(c) < 32 for c in value):
        raise ValueError('A required delivery field is missing or invalid')
    return value


def request_context(request):
    details = request.get('details', {})
    language = details.get('language')
    if language not in COPY:
        raise ValueError('Missing or unsupported request language. Resolve before delivery; never default to Hebrew.')
    reference = request.get('reference', '')
    if not re.fullmatch(r'WL-[A-Z0-9]{12}', reference):
        raise ValueError('Invalid request reference')
    recipient = single_line(details.get('email'))
    if not re.fullmatch(r'[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+', recipient):
        raise ValueError('Invalid customer email')
    return {'language': language, 'reference': reference, 'recipient': recipient}


def build_delivery_email(request, access):
    context = request_context(request)
    language = context['language']
    text = COPY[language]
    username = single_line(access.get('username'))
    password = single_line(access.get('temporaryPassword'))
    url = single_line(access.get('loginUrl'))
    parsed = urlsplit(url)
    if (parsed.scheme != 'https' or parsed.netloc != 'api.wroc-love.com'
            or parsed.path != '/personal-trips/' or parsed.query or parsed.fragment):
        raise ValueError('Use only the verified HTTPS login URL without credentials or tracking parameters')
    # Keep Hebrew labels and Latin-script credentials, references and URLs apart.
    lines = [text['intro'], '', text['link'], url, '', text['username'], username,
             '', text['password'], password, '', text['instructions'], '',
             text['privacy'], '', text['reference'], context['reference']]
    direction = 'rtl' if language == 'he' else 'ltr'
    paragraphs = []
    for index, line in enumerate(lines):
        if not line:
            continue
        content = html.escape(line)
        item_direction = 'ltr' if index in (3, 6, 9, 16) else direction
        if index == 3:
            content = '<a href="' + html.escape(url, quote=True) + '">' + content + '</a>'
        paragraphs.append('<p dir="' + item_direction + '">' + content + '</p>')
    key = hashlib.sha256((context['reference'] + '|' + context['recipient'].lower()
                          + '|initial-map-delivery').encode()).hexdigest()
    return {**context, 'subject': text['subject'], 'body': '\n'.join(lines),
            'html': '<!doctype html><html lang="' + language + '" dir="' + direction
                    + '"><meta charset="utf-8"><body>' + ''.join(paragraphs) + '</body></html>',
            'deliveryKey': key}


if __name__ == '__main__':
    try:
        envelope = json.load(sys.stdin)
        result = build_delivery_email(envelope['request'], envelope['access'])
        json.dump(result, sys.stdout, ensure_ascii=False)
    except (ValueError, KeyError, TypeError, AttributeError):
        # Do not echo input, credentials, email addresses or parser source excerpts.
        print('Cannot prepare delivery email: check request language, reference and access fields.', file=sys.stderr)
        sys.exit(1)
