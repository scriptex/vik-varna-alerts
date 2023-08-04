# ViK Varna Alerts

[![Github Build](https://github.com/scriptex/vik-varna-alerts/workflows/Build/badge.svg)](https://github.com/scriptex/vik-varna-alerts/actions?query=workflow%3ABuild)
[![Send email](https://github.com/scriptex/vik-varna-alerts/actions/workflows/send-email.yml/badge.svg)](https://github.com/scriptex/vik-varna-alerts/actions/workflows/send-email.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/34d3d75710534dc6a38c3584a1dcd068)](https://www.codacy.com/gh/scriptex/vik-varna-alerts/dashboard?utm_source=github.com&utm_medium=referral&utm_content=scriptex/vik-varna-alerts&utm_campaign=Badge_Grade)
[![Codebeat Badge](https://codebeat.co/badges/d765a4c8-2c0e-44f2-89c3-fa364fdc14e6)](https://codebeat.co/projects/github-com-scriptex-vik-varna-alerts-master)
[![CodeFactor Badge](https://www.codefactor.io/repository/github/scriptex/vik-varna-alerts/badge)](https://www.codefactor.io/repository/github/scriptex/vik-varna-alerts)
[![DeepScan grade](https://deepscan.io/api/teams/3574/projects/5257/branches/40799/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3574&pid=5257&bid=40799)
[![Analytics](https://ga-beacon-361907.ew.r.appspot.com/UA-83446952-1/github.com/scriptex/vik-varna-alerts/README.md?pixel)](https://github.com/scriptex/vik-varna-alerts/)

> Email and web notifications for planned repairs from ViK-Varna

## About

ViK Varna (ВиК-Варна) is the local water supplier for Varna region in Bulgaria. They post notifications about planned repairs on their website but it is not possible to subscribe to those notifications and receive them immediately - instead one should check their website frequently.

The code in this repository serves as a middleware between the website and the user - it sends hourly notifications on email which contain the latest news related to planned repairs and outages.

The way the code is structured allows for integration with any other website which has a dedicated page for this purpose.

## Usage

In order to use this repository, one must clone it and adjust the repository secrets found under `settings/secrets/actions` in the repository and add their own configuration:

```sh
# The email address of the recipient of the notifications
EMAIL_TO="recipient@example.com"

# The email address of the sender of the notifications
EMAIL_FROM="sender@example.com"

# The web address (URL) of the page that contains the notifications
ALERTS_PAGE="https://website.notifications/deep/link/"

# The subject in the email
EMAIL_SUBJECT="Planned outages and repairs"

# The CSS selector for the HTML element which contains the notifications
ALERTS_SELECTOR=".alerts-selector"

# API key for Brevo (formerly known as Sendinblue)
SENDINBLUE_API_KEY="abc-123"
```

## Available ways to use the code in this repository

The code is deployed via Vercel and is running as serverless lambda functions which can be accessed here:

-   [the page which contains the alerts](https://vik-varna-alerts.atanas.info/api/alerts)
-   [the page which sends an email with the alerts](https://vik-varna-alerts.atanas.info/api/email)

When forked and correctly set up, this repository creates a CRON job which sends an email at 0 (zero) o'clock each hour between 5:00 and 14:00 UTC.

One can adjust this by modifying the parameters in the [action configuration](https://github.com/scriptex/vik-varna-alerts/blob/main/.github/workflows/send-email.yml)

## Visitor stats

![GitHub stars](https://img.shields.io/github/stars/scriptex/vik-varna-alerts?style=social)
![GitHub forks](https://img.shields.io/github/forks/scriptex/vik-varna-alerts?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/scriptex/vik-varna-alerts?style=social)
![GitHub followers](https://img.shields.io/github/followers/scriptex?style=social)

## Code stats

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/scriptex/vik-varna-alerts)
![GitHub repo size](https://img.shields.io/github/repo-size/scriptex/vik-varna-alerts?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/scriptex/vik-varna-alerts?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/scriptex/vik-varna-alerts?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/vik-varna-alerts?style=plastic)

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
	<img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
	<img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
	<img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
	<img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
	<img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
