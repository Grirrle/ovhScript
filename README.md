[![Node.js Wrapper for OVH APIs](http://ovh.github.io/node-ovh/img/logo.png)](http://ovh.github.io/node-ovh)

[![Build Status](https://api.travis-ci.org/Grirrle/ovhScript.svg)](http://travis-ci.org/Grirrle/ovhScript)

Quelques script pour effectuer des tâches courante via le manager ovh

## Usage

pour plus de détails je vous invite à regarder
[le repo git node-ovh](https://github.com/ovh/node-ovh). ou [la documentation](http://ovh.github.io/node-ovh/)

mais globalement il faut :

### 1. installer les package 

```bash
$ npm install ovh
$ npm install async
$ npm install stdio
$ npm install console.table
```


### 2. créer la consomer key

modifier appKey et appSecret pour mettre les information fournie par ovh

```bash
$ node credentials.js -e ovh-eu -k 'votre api key' -s 'votre api secret key'
{ validationUrl: 'https://api.ovh.com/auth/?credentialToken=XXX',
  consumerKey: 'CK',
  state: 'pendingValidation' }
```
ensuite il faut aller sur  validationUrl via votre navigateur 

### 3. lancer le script

```bash
$ vi nomDuScript.js
```
modifier appKey et appSecret pour mettre les information fournie par ovh (comme étape 2)
mettre à jour la consumerKey crée et validé dans l'étape 2

```bash
$ node nomDuScript.js
```


## List des script

- credentials.js : cree la consumerKey
- backupReconnect.js : Supprime et recrée les ACL du service de backup pour tous vos serveurs (http://travaux.ovh.net/?do=details&id=13157)
- checkContact.js :  donne les contact admin, facturation et technique pour les serveur dedie et la telephonie



