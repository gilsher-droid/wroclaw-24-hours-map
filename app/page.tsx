const freeRouteUrl = "https://wroc-love.com/products/interactive-maps/map.html?lang=he";

const premiumDays = [
  {
    day: "יום 1",
    title: "העיר העתיקה והגמדים",
    text: "מסלול ראשון נעים בין כיכר השוק, הרחובות ההיסטוריים והגמדים שאסור לפספס.",
  },
  {
    day: "יום 2",
    title: "האוניברסיטה, הנהר ואוסטרוב טומסקי",
    text: "יום שמחבר תצפית, טיילת על גדת האודר והאזור העתיק והרגוע ביותר בעיר.",
  },
  {
    day: "יום 3",
    title: "Hydropolis, Hala Stulecia והמזרקה",
    text: "מסלול מזרח העיר עם אדריכלות, פארקים, מים ומופע ערב בעונה המתאימה.",
  },
  {
    day: "יום 4",
    title: "קניות, שיט, בתי קפה והשלמות",
    text: "יום גמיש שמאפשר לבחור את הקצב, להשלים מקומות ולסיים את הטיול בלי לחץ.",
  },
];

const included = [
  "ארבעה מסלולים יומיים מסודרים",
  "מפה אינטראקטיבית בעברית",
  "קישורי ניווט ישירים לכל תחנה",
  "המלצות אוכל, קפה, קינוחים וקניות",
  "זמני הליכה והצעות לקצב נוח",
  "עדכונים שוטפים למסלול",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Wroc-love – דף הבית">
          <img src="/logo.png" alt="Wrocław & Lower Silesia" />
          <span>
            <strong>Wroc-love</strong>
            <small>מסלולים חכמים למטיילים ישראלים</small>
          </span>
        </a>
        <nav aria-label="ניווט ראשי">
          <a href="#free">מסלול חינמי</a>
          <a href="#premium">מסלול 4 ימים</a>
          <a href="#how">איך זה עובד</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow">וורוצלב בידיים שלכם</span>
          <h1>
            פחות זמן לתכנן.
            <br />
            יותר זמן <em>להתאהב בעיר.</em>
          </h1>
          <p>
            מסלולים אינטראקטיביים בעברית שמסדרים את היום, מחברים בין המקומות
            הנכונים ומשאירים מספיק מקום לגילויים שבדרך.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={freeRouteUrl}>
              פתחו את מסלול 24 השעות
            </a>
            <a className="button button-quiet" href="#premium">
              הכירו את המסלול המלא
            </a>
          </div>
          <ul className="trust-list" aria-label="יתרונות">
            <li>בעברית</li>
            <li>מותאם לנייד</li>
            <li>קישורי ניווט ישירים</li>
          </ul>
        </div>

        <div className="route-preview" aria-label="תצוגה מקדימה של המסלול">
          <div className="preview-topline">
            <span>היום שלכם בוורוצלב</span>
            <span className="live-dot">מסלול חי</span>
          </div>
          <div className="preview-map">
            <span className="river river-one" />
            <span className="river river-two" />
            <span className="street street-one" />
            <span className="street street-two" />
            <span className="street street-three" />
            <span className="pin pin-one">1</span>
            <span className="pin pin-two">2</span>
            <span className="pin pin-three">3</span>
            <span className="pin pin-four">4</span>
            <div className="map-card">
              <small>התחנה הבאה</small>
              <strong>כיכר השוק של ורוצלב</strong>
              <span>8 דקות הליכה</span>
            </div>
          </div>
          <div className="preview-footer">
            <span><b>09:00</b> מתחילים בנחת</span>
            <span><b>8</b> תחנות</span>
            <span><b>4.6 ק״מ</b> הליכה</span>
          </div>
        </div>
      </section>

      <section className="free-section" id="free">
        <div>
          <span className="section-number">01</span>
          <span className="eyebrow">מתחילים בחינם</span>
          <h2>24 שעות בוורוצלב</h2>
          <p>
            מסלול טעימה מלא ליום אחד בעיר. פותחים בטלפון, בוחרים תחנה ויוצאים
            לדרך — בלי הרשמה ובלי כרטיס אשראי.
          </p>
        </div>
        <a className="route-ticket free-ticket" href={freeRouteUrl}>
          <span className="ticket-label">מסלול חינמי</span>
          <strong>יום אחד. העיר העתיקה, הנהר ואוסטרוב טומסקי.</strong>
          <span className="ticket-link">לפתיחת המפה ←</span>
        </a>
      </section>

      <section className="premium-section" id="premium">
        <div className="section-heading">
          <div>
            <span className="section-number">02</span>
            <span className="eyebrow">המוצר הראשון של Wroc-love</span>
            <h2>וורוצלב – המסלול המלא ל־4 ימים</h2>
          </div>
          <p>
            ארבעה ימים מסודרים בקצב הגיוני, עם כל מה שצריך כדי ליהנות מהעיר
            בלי לקפוץ הלוך ושוב ובלי לבלות את החופשה בחיפושים.
          </p>
        </div>

        <div className="premium-layout">
          <div className="days-grid">
            {premiumDays.map((item) => (
              <article className="day-card" key={item.day}>
                <span>{item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <aside className="price-card" aria-label="תכולת המסלול">
            <span className="price-badge">כרגע ללא תשלום</span>
            <div className="price">
              <strong>0</strong>
              <span>PLN</span>
            </div>
            <p>כל המסלולים והמפות זמינים כרגע ללא תשלום.</p>
            <ul>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="purchase-button" href="/products/interactive-maps/premium.html">פתיחת מסלול 4 הימים</a>
            <small>פשוט בוחרים מסלול ומתחילים לטייל.</small>
          </aside>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading compact">
          <div>
            <span className="section-number">03</span>
            <span className="eyebrow">פשוט מהבחירה ועד הטיול</span>
            <h2>איך זה עובד?</h2>
          </div>
        </div>
        <ol className="steps">
          <li>
            <span>1</span>
            <strong>בוחרים מסלול</strong>
            <p>מוצאים את המפה שמתאימה לסגנון ולמשך הטיול.</p>
          </li>
          <li>
            <span>2</span>
            <strong>פותחים מיד</strong>
            <p>בלי הרשמה, בלי מייל, בלי קוד ובלי תשלום.</p>
          </li>
          <li>
            <span>3</span>
            <strong>יוצאים לטייל</strong>
            <p>פותחים את המסלול מכל טלפון וחוזרים אליו מתי שרוצים.</p>
          </li>
        </ol>
      </section>

      <section className="closing">
        <span className="eyebrow">Wroc-love</span>
        <h2>העיר כבר מחכה. אנחנו רק מסדרים לכם את הדרך.</h2>
        <a className="button button-primary" href={freeRouteUrl}>
          התחילו במסלול החינמי
        </a>
      </section>

      <footer>
        <div>
          <strong>Wroc-love</strong>
          <span>מבית קהילת Wrocław &amp; Lower Silesia</span>
        </div>
        <a href="https://www.facebook.com/groups/2525899074519424">
          הקהילה שלנו בפייסבוק
        </a>
      </footer>
    </main>
  );
}
