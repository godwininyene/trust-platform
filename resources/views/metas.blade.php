@php
    $url = Request::url(); 
    $urlParts = explode("/", $url);
    $total = count($urlParts);
    $currentPage = $urlParts[$total - 1];  
@endphp

@if ($currentPage == 'FAQs')
    <title inertia>Trust Platform</title>
    <meta name="description" content="Trust Platform Trading is an international online forex and commodities broker." />
    <meta property="og:title"              content="Trust Platform Trading; An Online Forex & Investment Broker" />
    <meta property="og:description"        content="Invst with Trust Platform finance Trading; An international online forex and commodities broker." />
    <meta property="og:url"                content="https://trust-platformfinance.com/FAQs" />
@elseif ($currentPage == 'about-our-company')
    <title inertia>About Us - Trust Platform</title>
    <meta name="description" content="Learn more about Trust Platform Investment and Trading platform. An international online forex and commodities broker." />
    <meta property="og:title"              content="About Us - Trust Platform" />
    <meta property="og:description"        content="Learn more about  Trust Platform Investment and Trading platform. An international online forex and commodities broker." />
    <meta property="og:url"                content="https://trust-platformfinance.com/about-our-company" />
@elseif ($currentPage == 'contact-support')
    <title inertia>Contact Us - Trust Platform</title>
    <meta name="description" content="Contact Trust Platform to know more on our investments plans." />
    <meta property="og:title"              content="Contact Us - Trust Platform" />
    <meta property="og:description"        content="Contact Trust Platform to know more on our investments plans." />
    <meta property="og:url"                content="https://trust-platformfinance.com/contact-support" />
@elseif ($currentPage == 'investment')
    <title inertia>Investment Plans -Trust Platform</title>
    <meta name="description" content="Check out our Investment Plans and make a choice on how to grow your finances." />
    <meta property="og:title"              content="Investment Plans - Trust Platform" />
    <meta property="og:description"        content="Check out our Investment Plans and make a choice on how to grow your finances." />
    <meta property="og:url"                content="https://trust-platformfinance.com/investment" />
@else
    <title inertia>Trust Platform</title>
    <meta name="description" content="Trust Platform Trading is an international online forex and commodities broker." />
    <meta property="og:title"              content="Trust Platform Trading; An Online Forex & Investment Broker" />
    <meta property="og:description"        content="Invest with Trust Platform Trading; An international online forex and commodities broker." />
    <meta property="og:url"                content="https://trust-platformfinance.com/" />
@endif
<meta name="keywords" content="Trust Platform Trading, International online forex,  Commodities brokers, Investment Platform, Crypto Currency Investment, Global trade market, profitable trading platform, Profit Maximization" />
<meta property="og:type"               content="website" />
<meta property="og:image"              content="https://trust-platformfinance.com/favicon.png"/>
<meta name="author" content="Trust Platform." />
<meta name="contact" content="support@trust-platformfinance.com" />
<meta name="copyright" content="Copyright (c)2024 Trust Platform. All Rights Reserved." />