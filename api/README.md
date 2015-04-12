About
=====

This is the PHP client library for AYLIEN's APIs. If you haven't already done so, you will need to [sign up](https://developer.aylien.com/signup).

Installation
============

To install, simply added it to your `composer.json`:

```json
{
  "require": {
    "aylien/textapi": "0.2.*"
  }
}
```

See the [Developers Guide](https://developer.aylien.com/docs) for additional documentation.

Example
=======

```php
$textapi = new AYLIEN\TextAPI("YourApplicationId", "YourApplicationKey");
$sentiment = $textapi->Sentiment(array('text' => 'John is a very good football player!'));
```
API Links (replace all filenames and keywords with your own filenames and keywords)
=========
johnhinkel.com/SenseMaking/api/DocFetcher.php?filename=1101162433811
johnhinkel.com/SenseMaking/api/dateParser.php
johnhinkel.com/SenseMaking/api/DocNumbers.php
johnhinkel.com/SenseMaking/api/Frequency.php?filename=1101162433811&keyword=Alderwood
johnhinkel.com/SenseMaking/api/AylienCalls.php?filename=1101162433811
johnhinkel.com/SenseMaking/api/KeywordMatcher.php?keyword=Alderwood High
johnhinkel.com/SenseMaking/api/DocsByMonth.php?month=feb
johnhinkel.com/SenseMaking/api/FrequencyByMonth.php?keyword=Alderwood
