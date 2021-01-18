# novaConsent
novaConsent - Simple Cookie Consent Layer

Version 1.0 - Simple Cookie Consent Layer.

**Currently only technical necessary cookies supported!**

## Integration

Include in head:
```<link rel="stylesheet" type="text/css" href="novaconsent.css" />```

Include at the end of the body:
```<script src="novaconsent.js" async></script>```

## Own Configuration

You can use your own configuration. Just include a javascript variable with the name ```novaConsentConfig``` and overwride the values as your wish. It's not necessary to overwrite every value.

### Example with Full Configuration
```
<script type="text/javascript" charset="utf-8">
var novaConsentConfig = {
  cookieName: "novaConsent",
  cookieTimeout: 365,
  infoText: "We only use technically necessary cookies.",
  acceptButtonText: "Okay",
  moreInfo: "<a href='/privacy'>Details</a>",
  SameSite: "Strict",  
}
</script>
``` 

### Example to Overwrite Just Some Values
```
<script type="text/javascript" charset="utf-8">
var novaConsentConfig = {
  cookieTimeout: 250,
  moreInfo: "<a href='/privacy'>Details</a>",
}
</script>
``` 
