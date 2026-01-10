import { computed } from 'vue';
import { useLanguageStore } from '@/stores/language';

type TranslationKey = keyof typeof translations.en;

const translations = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    
    // Auth
    login: 'Login / Register',
    logout: 'Logout',
    signIn: 'Sign in',
    createAccount: 'Create account',
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    forgotPassword: 'Forgot password?',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    wrongEmailOrPassword: 'Wrong email or password',
    agreeToPrivacy: 'I agree to the',
    privacyPolicy: 'Privacy Policy',
    gdpr: '(GDPR)',
    resetPassword: 'Reset Password',
    sendResetLink: 'Send reset link',
    sending: 'Sending...',
    checkInboxReset: 'Check your inbox to reset your password.',
    enterEmailReset: 'Enter your email address and we\'ll send you a link to reset your password.',
    accountCreatedWelcome: 'Account created. Welcome to ADE!',
    welcomeBack: 'Welcome back',
    registrationFailed: 'Registration failed. Please try again.',
    minPasswordRequirement: 'Min 8 chars, 1 letter + 1 number',
    
    // Home page
    heroTitle: 'Elevate Your Daily Ritual',
    heroSubtitle: 'Discover premium cosmetics crafted for modern beauty. Every product tells a story of elegance and care.',
    shopNow: 'Shop Now',
    findYourBestBase: 'Find Your Best ADE Base',
    failedToLoadProducts: 'Failed to load products',
    
    // Products page
    noProductsYet: 'No products yet',
    checkBackSoon: 'Check back soon for new arrivals in this category',
    
    // Product categories (tabs)
    all: 'ALL',
    face: 'FACE',
    lips: 'LIPS',
    eyes: 'EYES',
    
    // Product detail
    availableShades: 'Available Shades',
    qty: 'Qty',
    addToCart: 'Add to Cart',
    productNotFound: 'Product not found',
    backToProducts: 'Back to Products',
    premiumQualityIngredients: 'Premium quality ingredients',
    crueltyFreeVegan: 'Cruelty-free and vegan',
    longLastingFormula: 'Long-lasting formula',
    suitableAllSkinTypes: 'Suitable for all skin types',
    addedToCart: 'Added to cart',
    
    // Cart
    yourBagEmpty: 'Your bag is empty',
    addSomeProducts: 'Add some products to get started',
    image: 'Image',
    product: 'Product',
    unitPrice: 'Unit Price',
    quantity: 'Quantity',
    total: 'Total',
    shade: 'Shade',
    remove: 'Remove',
    summary: 'Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    proceedToCheckout: 'Proceed to Checkout',
    continueShopping: 'Continue shopping',
    removedFromCart: 'Removed from cart',
    
    // Checkout
    checkout: 'Checkout',
    shippingDetails: 'Shipping Details',
    fullName: 'Full Name',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    postalCode: 'Postal Code',
    addressLine: 'Address Line',
    selectCountry: 'Select country',
    germany: 'Germany',
    france: 'France',
    turkey: 'Turkey',
    unitedKingdom: 'United Kingdom',
    unitedStates: 'United States',
    paymentMethod: 'Payment Method',
    creditDebitCard: 'Credit / Debit Card',
    paypal: 'PayPal',
    processing: 'Processing...',
    placeOrder: 'Place Order',
    orderSummary: 'Order Summary',
    orderPlaced: 'Order placed 🎉',
    thankYouOrder: 'Thank you for your order! Your order number is',
    backToHome: 'Back to Home',
    thisFieldRequired: 'This field is required',
    enterValidEmail: 'Please enter a valid email',
    pleaseFillRequiredFields: 'Please fill in all required fields',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordRequirement: 'Password must contain at least one letter and one number',
    mustAgreeToPrivacy: 'You must agree to the Privacy Policy',
    cartIsEmpty: 'Your cart is empty',
    failedToPlaceOrder: 'Failed to place order. Please try again.',
    streetAddressPlaceholder: 'Street address, apartment, suite, etc.',
    
    // About page
    allDayAllEssentialAllYou: 'All Day. All Essential. All You.',
    aboutDescription: 'ADE was born from a simple belief: beauty should be effortless, elegant, and essential. We create premium cosmetics that enhance your natural radiance without compromise. Each product is carefully crafted with high-quality ingredients and designed to fit seamlessly into your daily routine.',
    ourPhilosophy: 'Our Philosophy',
    philosophyDescription: 'We believe beauty is personal and powerful. It\'s about feeling confident in your own skin, expressing your unique style, and embracing what makes you, you. Our products are designed to empower, not dictate. They\'re tools for self-expression, not masks to hide behind.',
    ourMission: 'Our Mission',
    missionDescription: 'We\'re committed to providing cosmetics that empower you to feel confident and beautiful every day. Sustainability, quality, and inclusivity are at the heart of everything we do. We\'re constantly innovating to bring you the best products while minimizing our environmental impact.',
    haveQuestions: 'Have questions? We\'d love to hear from you.',
    contactUs: 'Contact us',
    
    // Contact page
    getInTouch: 'Get in Touch',
    contactIntro: 'We\'d love to hear from you. Whether you have a question about products, orders, or anything else, our team is ready to answer all your questions.',
    sendUsMessage: 'Send us a message',
    name: 'Name',
    message: 'Message',
    sendMessage: 'Send Message',
    ourStudio: 'Our Studio',
    location: 'Location',
    berlinGermany: 'Berlin, Germany',
    hours: 'Hours',
    businessHours: 'Monday – Saturday: 9:00 AM – 6:00 PM (CET)',
    sundayClosed: 'Sunday: Closed',
    thanksGetBack: 'Thanks, we\'ll get back to you shortly.',
    howCanWeHelp: 'How can we help you?',
    
    // Privacy Policy page
    privacyPolicyTitle: 'Privacy Policy',
    lastUpdated: 'Last updated: 2025',
    introduction: 'Introduction',
    introductionText: 'At ADE (All Day Essentials), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.',
    dataWeCollect: 'Data We Collect',
    dataWeCollectIntro: 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:',
    dataWeCollectIdentity: 'Identity Data includes first name, last name, username or similar identifier.',
    dataWeCollectContact: 'Contact Data includes billing address, delivery address, email address and telephone numbers.',
    dataWeCollectTransaction: 'Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.',
    dataWeCollectTechnical: 'Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.',
    howWeUseData: 'How We Use Your Data',
    howWeUseDataIntro: 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:',
    howWeUseDataRegister: 'To register you as a new customer',
    howWeUseDataProcess: 'To process and deliver your order',
    howWeUseDataManage: 'To manage your relationship with us',
    howWeUseDataImprove: 'To improve our website, products/services, marketing or customer relationships',
    howWeUseDataRecommend: 'To make recommendations to you about goods or services that may be of interest to you',
    dataSecurity: 'Data Security',
    dataSecurityText: 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.',
    yourLegalRights: 'Your Legal Rights',
    yourLegalRightsIntro: 'Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:',
    rightAccess: 'Request access to your personal data',
    rightCorrection: 'Request correction of your personal data',
    rightErasure: 'Request erasure of your personal data',
    rightObject: 'Object to processing of your personal data',
    rightRestriction: 'Request restriction of processing your personal data',
    rightTransfer: 'Request transfer of your personal data',
    rightWithdraw: 'Right to withdraw consent',
    cookies: 'Cookies',
    cookiesText: 'Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree.',
    contactUsPrivacy: 'If you have any questions about this privacy policy or our privacy practices, please contact us at:',
    
    // Footer
    allRightsReserved: '©2025 All Rights Reserved.',
    
    // Common
    hello: 'Hello',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    loggedOutSuccessfully: 'Logged out successfully',
    search: 'Search',
    
    // Product Names
    productHydraSkinTint: 'Hydra Skin Tint SPF15',
    productVelvetCompact: 'Velvet Compact Powder',
    productSatinRose: 'Satin Rose Lipstick',
    productSoftMatteBlush: 'ADE Soft Matte Blush',
    productEyeDefinitionDuo: 'ADE Eye Definition Duo',
    productEyeshadowPalette: 'ADE Eyeshadow Palette',
    productGlowHighlighter: 'ADE Glow Highlighter',
    productLengtheningMascara: 'ADE Lengthening Mascara',
    productPrecisionLipLiner: 'ADE Precision Lip Liner',
    
    // Product Descriptions
    descHydraSkinTint: 'Lightweight, breathable skin tint that evens complexion with a natural glow.',
    descVelvetCompact: 'Smooth, silky pressed powder that blurs pores and evens tone.',
    descSatinRose: 'Rich, creamy color with a satin finish for everyday elegance.',
    descSoftMatteBlush: 'Pure-blending blush with seamless texture and a cloud-like payoff.',
    descEyeDefinitionDuo: 'Precision liquid liner paired with volumizing mascara for defined eyes.',
    descEyeshadowPalette: '12-pan palette of velvety mattes and foiled metallics in rose-tone hues.',
    descGlowHighlighter: 'Creamy highlighter that melts into skin with glass-like sheen.',
    descLengtheningMascara: 'Fiber-rich mascara that lifts, lengthens, and defines each lash.',
    descPrecisionLipLiner: 'Shape, define, and perfect your lips with effortless elegance.',
  },
  de: {
    // Navigation
    home: 'Startseite',
    products: 'Produkte',
    about: 'Über uns',
    contact: 'Kontakt',
    
    // Auth
    login: 'Anmelden / Registrieren',
    logout: 'Abmelden',
    signIn: 'Anmelden',
    createAccount: 'Konto erstellen',
    email: 'E-Mail',
    password: 'Passwort',
    firstName: 'Vorname',
    lastName: 'Nachname',
    forgotPassword: 'Passwort vergessen?',
    signingIn: 'Anmeldung läuft...',
    creatingAccount: 'Konto wird erstellt...',
    wrongEmailOrPassword: 'Falsche E-Mail oder Passwort',
    agreeToPrivacy: 'Ich stimme der',
    privacyPolicy: 'Datenschutzerklärung',
    gdpr: '(DSGVO)',
    resetPassword: 'Passwort zurücksetzen',
    sendResetLink: 'Link zum Zurücksetzen senden',
    sending: 'Wird gesendet...',
    checkInboxReset: 'Überprüfen Sie Ihren Posteingang, um Ihr Passwort zurückzusetzen.',
    enterEmailReset: 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.',
    accountCreatedWelcome: 'Konto erstellt. Willkommen bei ADE!',
    welcomeBack: 'Willkommen zurück',
    registrationFailed: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    minPasswordRequirement: 'Mind. 8 Zeichen, 1 Buchstabe + 1 Zahl',
    
    // Home page
    heroTitle: 'Erhöhen Sie Ihr tägliches Ritual',
    heroSubtitle: 'Entdecken Sie Premium-Kosmetik für moderne Schönheit. Jedes Produkt erzählt eine Geschichte von Eleganz und Sorgfalt.',
    shopNow: 'Jetzt einkaufen',
    findYourBestBase: 'Finden Sie Ihre beste ADE Basis',
    failedToLoadProducts: 'Produkte konnten nicht geladen werden',
    
    // Products page
    noProductsYet: 'Noch keine Produkte',
    checkBackSoon: 'Schauen Sie bald wieder vorbei für neue Produkte in dieser Kategorie',
    
    // Product categories (tabs)
    all: 'ALLE',
    face: 'GESICHT',
    lips: 'LIPPEN',
    eyes: 'AUGEN',
    
    // Product detail
    availableShades: 'Verfügbare Farbtöne',
    qty: 'Menge',
    addToCart: 'In den Warenkorb',
    productNotFound: 'Produkt nicht gefunden',
    backToProducts: 'Zurück zu Produkten',
    premiumQualityIngredients: 'Premium-Qualität Inhaltsstoffe',
    crueltyFreeVegan: 'Tierversuchsfrei und vegan',
    longLastingFormula: 'Langanhaltende Formel',
    suitableAllSkinTypes: 'Für alle Hauttypen geeignet',
    addedToCart: 'Zum Warenkorb hinzugefügt',
    
    // Cart
    yourBagEmpty: 'Ihre Tasche ist leer',
    addSomeProducts: 'Fügen Sie einige Produkte hinzu, um loszulegen',
    image: 'Bild',
    product: 'Produkt',
    unitPrice: 'Stückpreis',
    quantity: 'Menge',
    total: 'Gesamt',
    shade: 'Farbton',
    remove: 'Entfernen',
    summary: 'Zusammenfassung',
    subtotal: 'Zwischensumme',
    shipping: 'Versand',
    free: 'Kostenlos',
    proceedToCheckout: 'Zur Kasse',
    continueShopping: 'Weiter einkaufen',
    removedFromCart: 'Aus dem Warenkorb entfernt',
    
    // Checkout
    checkout: 'Kasse',
    shippingDetails: 'Versanddetails',
    fullName: 'Vollständiger Name',
    phone: 'Telefon',
    country: 'Land',
    city: 'Stadt',
    postalCode: 'Postleitzahl',
    addressLine: 'Adresszeile',
    selectCountry: 'Land auswählen',
    germany: 'Deutschland',
    france: 'Frankreich',
    turkey: 'Türkei',
    unitedKingdom: 'Vereinigtes Königreich',
    unitedStates: 'Vereinigte Staaten',
    paymentMethod: 'Zahlungsmethode',
    creditDebitCard: 'Kredit- / Debitkarte',
    paypal: 'PayPal',
    processing: 'Verarbeitung...',
    placeOrder: 'Bestellung aufgeben',
    orderSummary: 'Bestellübersicht',
    orderPlaced: 'Bestellung aufgegeben 🎉',
    thankYouOrder: 'Vielen Dank für Ihre Bestellung! Ihre Bestellnummer ist',
    backToHome: 'Zurück zur Startseite',
    thisFieldRequired: 'Dieses Feld ist erforderlich',
    enterValidEmail: 'Bitte geben Sie eine gültige E-Mail ein',
    pleaseFillRequiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus',
    passwordMinLength: 'Das Passwort muss mindestens 8 Zeichen lang sein',
    passwordRequirement: 'Das Passwort muss mindestens einen Buchstaben und eine Zahl enthalten',
    mustAgreeToPrivacy: 'Sie müssen der Datenschutzerklärung zustimmen',
    cartIsEmpty: 'Ihr Warenkorb ist leer',
    failedToPlaceOrder: 'Bestellung konnte nicht aufgegeben werden. Bitte versuchen Sie es erneut.',
    streetAddressPlaceholder: 'Straßenadresse, Wohnung, Suite usw.',
    
    // About page
    allDayAllEssentialAllYou: 'Den ganzen Tag. Alles Wesentliche. Alles Sie.',
    aboutDescription: 'ADE wurde aus einer einfachen Überzeugung geboren: Schönheit sollte mühelos, elegant und wesentlich sein. Wir kreieren Premium-Kosmetik, die Ihre natürliche Ausstrahlung ohne Kompromisse verstärkt. Jedes Produkt wird sorgfältig mit hochwertigen Inhaltsstoffen hergestellt und passt sich nahtlos in Ihre tägliche Routine ein.',
    ourPhilosophy: 'Unsere Philosophie',
    philosophyDescription: 'Wir glauben, dass Schönheit persönlich und kraftvoll ist. Es geht darum, sich in der eigenen Haut wohl zu fühlen, Ihren einzigartigen Stil auszudrücken und das zu umarmen, was Sie ausmacht. Unsere Produkte sind darauf ausgelegt, zu stärken, nicht zu diktieren. Sie sind Werkzeuge für Selbstausdruck, keine Masken, hinter denen man sich versteckt.',
    ourMission: 'Unsere Mission',
    missionDescription: 'Wir sind verpflichtet, Kosmetik bereitzustellen, die Sie dazu befähigt, sich jeden Tag selbstbewusst und schön zu fühlen. Nachhaltigkeit, Qualität und Inklusivität stehen im Mittelpunkt all dessen, was wir tun. Wir innovieren ständig, um Ihnen die besten Produkte zu bringen und gleichzeitig unsere Umweltauswirkungen zu minimieren.',
    haveQuestions: 'Haben Sie Fragen? Wir würden uns freuen, von Ihnen zu hören.',
    contactUs: 'Kontaktieren Sie uns',
    
    // Contact page
    getInTouch: 'Nehmen Sie Kontakt auf',
    contactIntro: 'Wir würden uns freuen, von Ihnen zu hören. Egal, ob Sie eine Frage zu Produkten, Bestellungen oder etwas anderem haben, unser Team ist bereit, alle Ihre Fragen zu beantworten.',
    sendUsMessage: 'Senden Sie uns eine Nachricht',
    name: 'Name',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    ourStudio: 'Unser Studio',
    location: 'Standort',
    berlinGermany: 'Berlin, Deutschland',
    hours: 'Öffnungszeiten',
    businessHours: 'Montag – Samstag: 9:00 – 18:00 Uhr (MEZ)',
    sundayClosed: 'Sonntag: Geschlossen',
    thanksGetBack: 'Danke, wir werden uns in Kürze bei Ihnen melden.',
    howCanWeHelp: 'Wie können wir Ihnen helfen?',
    
    // Privacy Policy page
    privacyPolicyTitle: 'Datenschutzerklärung',
    lastUpdated: 'Zuletzt aktualisiert: 2025',
    introduction: 'Einleitung',
    introductionText: 'Bei ADE (All Day Essentials) respektieren wir Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Daten zu schützen. Diese Datenschutzerklärung informiert Sie darüber, wie wir Ihre persönlichen Daten behandeln, wenn Sie unsere Website besuchen, und teilt Ihnen Ihre Datenschutzrechte mit und wie das Gesetz Sie schützt.',
    dataWeCollect: 'Daten, die wir sammeln',
    dataWeCollectIntro: 'Wir können verschiedene Arten persönlicher Daten über Sie sammeln, verwenden, speichern und übertragen, die wir wie folgt gruppiert haben:',
    dataWeCollectIdentity: 'Identitätsdaten umfassen Vorname, Nachname, Benutzername oder ähnliche Identifikatoren.',
    dataWeCollectContact: 'Kontaktdaten umfassen Rechnungsadresse, Lieferadresse, E-Mail-Adresse und Telefonnummern.',
    dataWeCollectTransaction: 'Transaktionsdaten umfassen Details zu Zahlungen von und an Sie sowie weitere Details zu Produkten und Dienstleistungen, die Sie bei uns gekauft haben.',
    dataWeCollectTechnical: 'Technische Daten umfassen Internet-Protokoll-Adresse (IP), Browsertyp und -version, Zeitzoneneinstellung und Standort, Browser-Plugin-Typen und -Versionen, Betriebssystem und Plattform.',
    howWeUseData: 'Wie wir Ihre Daten verwenden',
    howWeUseDataIntro: 'Wir werden Ihre persönlichen Daten nur verwenden, wenn das Gesetz es uns erlaubt. Am häufigsten werden wir Ihre persönlichen Daten in den folgenden Fällen verwenden:',
    howWeUseDataRegister: 'Um Sie als neuen Kunden zu registrieren',
    howWeUseDataProcess: 'Um Ihre Bestellung zu bearbeiten und zu liefern',
    howWeUseDataManage: 'Um Ihre Beziehung mit uns zu verwalten',
    howWeUseDataImprove: 'Um unsere Website, Produkte/Dienstleistungen, Marketing oder Kundenbeziehungen zu verbessern',
    howWeUseDataRecommend: 'Um Ihnen Empfehlungen zu Waren oder Dienstleistungen zu geben, die für Sie von Interesse sein könnten',
    dataSecurity: 'Datensicherheit',
    dataSecurityText: 'Wir haben angemessene Sicherheitsmaßnahmen ergriffen, um zu verhindern, dass Ihre persönlichen Daten versehentlich verloren gehen, auf nicht autorisierte Weise verwendet oder darauf zugegriffen, verändert oder offengelegt werden. Darüber hinaus beschränken wir den Zugriff auf Ihre persönlichen Daten auf diejenigen Mitarbeiter, Agenten, Auftragnehmer und andere Dritte, die aus geschäftlichen Gründen Kenntnis davon haben müssen.',
    yourLegalRights: 'Ihre gesetzlichen Rechte',
    yourLegalRightsIntro: 'Unter bestimmten Umständen haben Sie Rechte im Rahmen der Datenschutzgesetze in Bezug auf Ihre persönlichen Daten, einschließlich des Rechts:',
    rightAccess: 'Zugriff auf Ihre persönlichen Daten anzufordern',
    rightCorrection: 'Korrektur Ihrer persönlichen Daten anzufordern',
    rightErasure: 'Löschung Ihrer persönlichen Daten anzufordern',
    rightObject: 'Der Verarbeitung Ihrer persönlichen Daten zu widersprechen',
    rightRestriction: 'Einschränkung der Verarbeitung Ihrer persönlichen Daten anzufordern',
    rightTransfer: 'Übertragung Ihrer persönlichen Daten anzufordern',
    rightWithdraw: 'Recht auf Widerruf der Einwilligung',
    cookies: 'Cookies',
    cookiesText: 'Unsere Website verwendet Cookies, um Sie von anderen Benutzern unserer Website zu unterscheiden. Dies hilft uns, Ihnen ein gutes Erlebnis zu bieten, wenn Sie unsere Website durchsuchen, und ermöglicht es uns auch, unsere Website zu verbessern. Ein Cookie ist eine kleine Datei mit Buchstaben und Zahlen, die wir auf Ihrem Browser oder der Festplatte Ihres Computers speichern, wenn Sie zustimmen.',
    contactUsPrivacy: 'Wenn Sie Fragen zu dieser Datenschutzerklärung oder unseren Datenschutzpraktiken haben, kontaktieren Sie uns bitte unter:',
    
    // Footer
    allRightsReserved: '©2025 Alle Rechte vorbehalten.',
    
    // Common
    hello: 'Hallo',
    loading: 'Wird geladen...',
    error: 'Fehler',
    success: 'Erfolg',
    loggedOutSuccessfully: 'Erfolgreich abgemeldet',
    search: 'Suchen',
    
    // Product Names
    productHydraSkinTint: 'Hydra Skin Tint SPF15',
    productVelvetCompact: 'Velvet Kompaktpuder',
    productSatinRose: 'Satin Rose Lippenstift',
    productSoftMatteBlush: 'ADE Soft Matte Rouge',
    productEyeDefinitionDuo: 'ADE Augen Definition Duo',
    productEyeshadowPalette: 'ADE Lidschatten Palette',
    productGlowHighlighter: 'ADE Glow Highlighter',
    productLengtheningMascara: 'ADE Verlängernde Mascara',
    productPrecisionLipLiner: 'ADE Präzisions-Lipliner',
    
    // Product Descriptions
    descHydraSkinTint: 'Leichte, atmungsaktive Hautfarbe, die den Teint mit einem natürlichen Glanz ausgleicht.',
    descVelvetCompact: 'Glatter, seidiger Kompaktpuder, der Poren weichzeichnet und den Ton ausgleicht.',
    descSatinRose: 'Reichhaltige, cremige Farbe mit satiniertem Finish für alltägliche Eleganz.',
    descSoftMatteBlush: 'Rein mischbares Rouge mit nahtloser Textur und wolkenartiger Deckkraft.',
    descEyeDefinitionDuo: 'Präzisions-Liquid-Liner gepaart mit voluminöser Mascara für definierte Augen.',
    descEyeshadowPalette: '12-Farben-Palette aus samtigen Matten und folierten Metallic in Rosé-Tönen.',
    descGlowHighlighter: 'Cremiger Highlighter, der in die Haut einschmilzt mit glasartigem Glanz.',
    descLengtheningMascara: 'Faserreiche Mascara, die jede Wimper hebt, verlängert und definiert.',
    descPrecisionLipLiner: 'Formen, definieren und perfektionieren Sie Ihre Lippen mit müheloser Eleganz.',
  },
};

// Product ID to translation key mapping
const productNameKeys: Record<string, TranslationKey> = {
  'ade-hydra-skin-tint': 'productHydraSkinTint',
  'ade-velvet-compact': 'productVelvetCompact',
  'ade-satin-rose': 'productSatinRose',
  'ade-soft-matte-blush': 'productSoftMatteBlush',
  'ade-eye-definition-duo': 'productEyeDefinitionDuo',
  'ade-rose-gold-eyeshadow': 'productEyeshadowPalette',
  'ade-glow-highlighter': 'productGlowHighlighter',
  'ade-lengthening-mascara': 'productLengtheningMascara',
  'ade-precision-lip-liner': 'productPrecisionLipLiner',
};

const productDescKeys: Record<string, TranslationKey> = {
  'ade-hydra-skin-tint': 'descHydraSkinTint',
  'ade-velvet-compact': 'descVelvetCompact',
  'ade-satin-rose': 'descSatinRose',
  'ade-soft-matte-blush': 'descSoftMatteBlush',
  'ade-eye-definition-duo': 'descEyeDefinitionDuo',
  'ade-rose-gold-eyeshadow': 'descEyeshadowPalette',
  'ade-glow-highlighter': 'descGlowHighlighter',
  'ade-lengthening-mascara': 'descLengtheningMascara',
  'ade-precision-lip-liner': 'descPrecisionLipLiner',
};

// Composable function for internationalization (i18n)
// This provides translation functionality for the entire application
export function useI18n() {
  // Get the language store to access the current language setting
  const languageStore = useLanguageStore();

  // Main translation function - gets the translation for a given key
  // If the translation doesn't exist in the current language, falls back to English
  // If it doesn't exist in English either, returns the key itself
  const t = (key: TranslationKey): string => {
    const currentLang = languageStore.currentLanguage;
    // Try to get translation in current language
    const translationInCurrentLang = translations[currentLang][key];
    if (translationInCurrentLang) {
      return translationInCurrentLang;
    }
    // Fallback to English if translation doesn't exist in current language
    const translationInEnglish = translations.en[key];
    if (translationInEnglish) {
      return translationInEnglish;
    }
    // If no translation exists at all, return the key itself
    return key;
  };

  // Translate product names based on product ID
  // Some products have custom translated names, others use their default name
  const translateProductName = (productId: string, fallbackName: string): string => {
    // Look up the translation key for this product ID
    const translationKey = productNameKeys[productId];
    if (translationKey) {
      // If we have a translation key, use the main translation function
      return t(translationKey);
    }
    // If no translation key exists, use the fallback name (default product name)
    return fallbackName;
  };

  // Translate product descriptions based on product ID
  // Similar to product names, some descriptions are translated
  const translateProductDesc = (productId: string, fallbackDesc: string): string => {
    // Look up the translation key for this product description
    const translationKey = productDescKeys[productId];
    if (translationKey) {
      // If we have a translation key, use the main translation function
      return t(translationKey);
    }
    // If no translation key exists, use the fallback description (default description)
    return fallbackDesc;
  };

  // Computed property to get the current language
  // This is reactive - it will update when the language changes
  const currentLanguage = computed(() => languageStore.currentLanguage);

  // Return all the functions and properties that components need
  return {
    t, // Main translation function
    translateProductName, // Product name translation
    translateProductDesc, // Product description translation
    currentLanguage, // Current language (reactive)
  };
}

