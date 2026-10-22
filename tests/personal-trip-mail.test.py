import importlib.util
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'bluehost-api/tools/personal_trip_mail.py'
spec = importlib.util.spec_from_file_location('personal_trip_mail', SOURCE)
mail = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mail)


class DeliveryMailTests(unittest.TestCase):
    def request(self, language='en'):
        return {'reference': 'WL-000000000001', 'details': {
            'email': 'customer@example.com', 'language': language}}

    def access(self):
        return {'username': 'demo', 'temporaryPassword': 'DEMO<&>password',
                'loginUrl': 'https://api.wroc-love.com/personal-trips/'}

    def test_five_languages_from_original_request(self):
        for language in ('he', 'en', 'de', 'cs', 'pl'):
            with self.subTest(language=language):
                result = mail.build_delivery_email(self.request(language), self.access())
                self.assertEqual(result['language'], language)
                self.assertEqual(result['recipient'], 'customer@example.com')
                self.assertEqual(result['subject'], mail.COPY[language]['subject'])
                self.assertIn(mail.COPY[language]['instructions'], result['body'])
                self.assertIn('lang="' + language + '"', result['html'])
                self.assertNotIn('DEMO<&>password', result['html'])
                self.assertIn('DEMO&lt;&amp;&gt;password', result['html'])
                if language != 'he':
                    self.assertFalse(any('\u0590' <= c <= '\u05ff' for c in result['body']))

    def test_missing_language_never_defaults_to_hebrew(self):
        for language in (None, '', 'fr', 'EN'):
            with self.subTest(language=language), self.assertRaises(ValueError):
                mail.build_delivery_email(self.request(language), self.access())

    def test_browser_or_route_language_cannot_override_request(self):
        request = self.request('pl')
        request['language'] = 'he'
        result = mail.build_delivery_email(request, {**self.access(), 'language': 'he'})
        self.assertEqual(result['language'], 'pl')

    def test_hebrew_labels_separate_from_latin_values(self):
        body = mail.build_delivery_email(self.request('he'), self.access())['body']
        for line in body.splitlines():
            if any('\u0590' <= c <= '\u05ff' for c in line):
                self.assertFalse(any('a' <= c.lower() <= 'z' for c in line))

    def test_no_credentials_in_link(self):
        for url in ('http://api.wroc-love.com/personal-trips/',
                    'https://evil.example/personal-trips/',
                    'https://api.wroc-love.com/personal-trips/?password=secret',
                    'https://api.wroc-love.com/personal-trips/#secret'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                mail.build_delivery_email(self.request(), {**self.access(), 'loginUrl': url})

    def test_header_injection_rejected(self):
        request = self.request()
        request['details']['email'] = 'customer@example.com\nBcc: other@example.com'
        with self.assertRaises(ValueError):
            mail.build_delivery_email(request, self.access())

    def test_delivery_key_stable_across_language_changes(self):
        # Changing language must not create an excuse to send the initial mail twice.
        en = mail.build_delivery_email(self.request('en'), self.access())
        he = mail.build_delivery_email(self.request('he'), self.access())
        self.assertEqual(en['deliveryKey'], he['deliveryKey'])


if __name__ == '__main__':
    unittest.main()
