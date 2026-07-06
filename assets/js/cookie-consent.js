/**
 * Cookie Consent Configuration
 * Using orestbida/cookieconsent v3
 * https://cookieconsent.orestbida.com/
 */

window.addEventListener('load', function() {
    CookieConsent.run({
        cookie: {
            name: 'cc_cookie',
            path: '/',
            domain: 'littlecheesecake.me',
            expiresAfterDays: 365
        },
        revision: 1,
        guiOptions: {
            consentModal: {
                layout: 'bar inline',
                position: 'bottom'
            },
            preferencesModal: {
                layout: 'box'
            }
        },
        categories: {
            necessary: {
                enabled: true,
                readOnly: true
            },
            analytics: {
                enabled: false,
                autoClear: {
                    cookies: [
                        { name: /^_ga/ },
                        { name: '_gid' }
                    ]
                }
            },
            advertising: {
                enabled: false,
                autoClear: {
                    cookies: [
                        { name: /^_gcl/ },
                        { name: 'IDE' },
                        { name: 'test_cookie' }
                    ]
                }
            }
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'We use cookies',
                        description: 'We use cookies to enhance your experience. <button type="button" data-cc="show-preferencesModal" class="cc-link">Manage preferences</button>',
                        acceptAllBtn: 'Accept',
                        acceptNecessaryBtn: 'Decline'
                    },
                    preferencesModal: {
                        title: 'Cookie Preferences',
                        acceptAllBtn: 'Accept',
                        acceptNecessaryBtn: 'Decline',
                        savePreferencesBtn: 'Save preferences',
                        sections: [
                            {
                                title: 'Necessary Cookies',
                                description: 'These cookies are essential for the website to function properly.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Analytics Cookies',
                                description: 'These cookies help us understand how visitors interact with the website by collecting anonymous information.',
                                linkedCategory: 'analytics'
                            },
                            {
                                title: 'Advertising Cookies',
                                description: 'These cookies are used to show you relevant ads and measure ad campaign effectiveness.',
                                linkedCategory: 'advertising'
                            }
                        ]
                    }
                }
            }
        },
        onConsent: function() {
            updateGoogleConsent();
        },
        onChange: function() {
            updateGoogleConsent();
        }
    });
});

/**
 * Update GA Consent Mode v2 state based on user's cookie choices.
 * GTM is loaded upfront (see head.html); this just signals consent changes.
 */
function updateGoogleConsent() {
    if (typeof gtag !== 'function') return;

    const analyticsGranted = CookieConsent.acceptedCategory('analytics');
    const advertisingGranted = CookieConsent.acceptedCategory('advertising');

    gtag('consent', 'update', {
        'analytics_storage': analyticsGranted ? 'granted' : 'denied',
        'ad_storage': advertisingGranted ? 'granted' : 'denied',
        'ad_user_data': advertisingGranted ? 'granted' : 'denied',
        'ad_personalization': advertisingGranted ? 'granted' : 'denied'
    });

    if (advertisingGranted) {
        loadAddThis();
    }
}

/**
 * Load AddThis sharing widget
 */
function loadAddThis() {
    if(window.addthisLoaded) return;
    window.addthisLoaded = true;
    var script = document.createElement('script');
    script.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-551ec72a4d0e58c1';
    script.async = true;
    document.head.appendChild(script);
}
