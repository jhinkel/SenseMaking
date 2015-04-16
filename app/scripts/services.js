'use strict';

angular.module('SenseMakingApp.services', [])
    .factory('API', function ($http) {
        var api = "http://johnhinkel.com/SenseMaking/api/";
        return {
            callAylien: function (docNumber) {
                return $http.get(api + "AylienCalls.php?filename=" + docNumber).then(
                    function (response) {
                        sessionStorage.setItem('Aylien', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('Aylien'));

                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return {
                            0: {
                                organization: [
                                    "Alderwood City Council",
                                    "Alderwood High School",
                                    "Hospital",
                                    "United Methodist Church"
                                ],
                                location: [
                                    "Tacoma",
                                    "Washington",
                                    "Centennial Square"
                                ],
                                keyword: [
                                    "teachers in Alderwood",
                                    "Alderwood City",
                                    "City of Alderwood",
                                    "teachers don t help fix schools",
                                    "school year",
                                    "Alderwood",
                                    "teachers",
                                    "City",
                                    "years",
                                    "great",
                                    "Panni",
                                    "programs",
                                    "schools",
                                    "people",
                                    "Blood",
                                    "units",
                                    "recreation",
                                    "life",
                                    "money",
                                    "Washington"
                                ],
                                date: [
                                    "Monday",
                                    "Election",
                                    "summer",
                                    "last year",
                                    "Saturday",
                                    "Jan. 4"
                                ],
                                money: [
                                    "$30,000",
                                    "$10,000"
                                ],
                                person: [
                                    "John Sarducci",
                                    "John Panni",
                                    "Aiken",
                                    "Steve Evanswill",
                                    "Steve Evans",
                                    "Evans Olivas",
                                    "Ron Olivas",
                                    "Christine Gregoire",
                                    "Rita Blunk",
                                    "Bob Story",
                                    "Max",
                                    "Ella Mae Lochner",
                                    "Myrtis Lang",
                                    "Alice Benedetti",
                                    "Phyllis Morris",
                                    "Trude Meadowcroft",
                                    "Letha Grubb",
                                    "Lu Ann Roach",
                                    "Nita Coleman",
                                    "Ruth Stark",
                                    "Marie Handy"
                                ]
                            },
                            polarity: "positive",
                            polarityConfidence: 0.98267326732673,
                            subjectivityConfidence: 1
                        };
                    }
                );
            },//callAylien

            getDocKeywordFrequency: function (docNumber, keyword) {
                return $http.get(api + "Frequency.php?filename=" + docNumber + "&keyword=" + keyword).then(
                    function (response) {
                        sessionStorage.setItem('docKeywordFrequency', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('docKeywordFrequency'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
						return 15;
                    }
                );
            },//getDocKeywordFrequency

            getDocDates: function () {
                return $http.get(api + "dateParser.php").then(
                    function (response) {
                        sessionStorage.setItem('docDates', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('docDates'));;
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return {"1101162143775.txt":"2004-07-03","1101162433811.txt":"2004-11-10","1101162452451.txt":"2004-11-10","1101162452967.txt":"2004-11-09","1101162453655.txt":"2004-11-08","1101162454389.txt":"2004-11-08","1101162468967.txt":"2004-11-05","1101162469467.txt":"2004-11-05","1101162469951.txt":"2004-11-05","1101162470451.txt":"2004-11-05","1101162470951.txt":"2004-11-05","1101162488420.txt":"2004-11-03","1101162488967.txt":"2004-11-02","1101162490186.txt":"2004-11-01","1101162504873.txt":"2004-10-29","1101162505451.txt":"2004-10-29","1101162506170.txt":"2004-10-29","1101162507155.txt":"2004-10-27","1101162522889.txt":"2004-10-27","1101162523405.txt":"2004-10-27","1101162524451.txt":"2004-10-25","1101162539420.txt":"2004-10-22","1101162539889.txt":"2004-10-22","1101162540358.txt":"2004-10-22","1101162541092.txt":"2004-10-21","1101162589891.txt":"2004-10-09","1101162605515.txt":"2004-10-20","1101162605999.txt":"2004-10-19","1101162606483.txt":"2004-10-19","1101162607218.txt":"2004-10-18","1101162607702.txt":"2004-10-18","1101162622968.txt":"2004-10-15","1101162623703.txt":"2004-10-13","1101162624171.txt":"2004-10-12","1101162640781.txt":"2004-10-12","1101162641766.txt":"2004-10-08","1101162642891.txt":"2004-10-08","1101162686673.txt":"2004-10-07","1101162687439.txt":"2004-10-06","1101162688110.txt":"2004-09-13","1101162688970.txt":"2004-10-04","1101162691111.txt":"2004-10-01","1101162707205.txt":"2004-10-01","1101162707799.txt":"2004-09-29","1101162708267.txt":"2004-09-29","1101162708736.txt":"2004-09-27","1101162768659.txt":"2004-09-24","1101162769191.txt":"2004-09-23","1101162769956.txt":"2004-09-21","1101162770925.txt":"2004-09-20","1101162786926.txt":"2004-09-17","1101162787426.txt":"2004-09-15","1101162787910.txt":"2004-09-14","1101162788910.txt":"2004-09-13","1101162807895.txt":"2004-09-08","1101162809567.txt":"2004-09-07","1101162862771.txt":"2004-09-03","1101162863490.txt":"2004-09-03","1101162863959.txt":"2004-09-02","1101162879397.txt":"2004-09-01","1101162880756.txt":"2004-09-01","1101162881272.txt":"2004-08-30","1101162881756.txt":"2004-08-27","1101162902397.txt":"2004-08-27","1101162902913.txt":"2004-08-27","1101162903381.txt":"2004-08-26","1101162904116.txt":"2004-08-25","1101162906435.txt":"2004-07-13","1101162945882.txt":"2004-08-24","1101162948101.txt":"2004-08-20","1101162948851.txt":"2004-08-20","1101162949366.txt":"2004-08-20","1101162964241.txt":"2004-08-20","1101162965023.txt":"2004-08-18","1101162965507.txt":"2004-08-18","1101162966023.txt":"2004-08-17","1101162966523.txt":"2004-08-16","1101162981695.txt":"2004-08-13","1101162982195.txt":"2004-08-13","1101162982898.txt":"2004-08-11","1101163001554.txt":"2004-08-09","1101163002039.txt":"2004-08-06","1101163002539.txt":"2004-08-06","1101163004554.txt":"2004-08-05","1101163044539.txt":"2004-07-21","1101163061865.txt":"2004-07-19","1101163072805.txt":"2004-07-19","1101163128915.txt":"2004-07-07","1101163144775.txt":"2004-07-05","1101163156775.txt":"2004-07-02","1101163162978.txt":"2004-06-28","1101163179932.txt":"2004-06-24","1101163197619.txt":"2004-06-21","1101163233666.txt":"2004-06-07","1101163235119.txt":"2004-06-04","1101163252385.txt":"2004-06-03","1101163253588.txt":"2004-06-02","1101163287775.txt":"2004-05-26","1101163288338.txt":"2004-05-24","1101163307182.txt":"2004-05-17","1101163308494.txt":"2004-05-13","1101163324807.txt":"2004-05-11","1101163340400.txt":"2004-05-10","1101163342119.txt":"2004-05-04","1101163356500.txt":"2004-04-16","1101163375354.txt":"2004-04-23","1101163376276.txt":"2004-04-23","1101163390822.txt":"2004-04-21","1101163443760.txt":"2004-04-01","1101163444463.txt":"2004-03-31","1101163456898.txt":"2004-05-02","1101163461838.txt":"2004-03-26","1101163477635.txt":"2004-03-25","1101163498744.txt":"2004-03-19","1101163520244.txt":"2004-03-15","1101163520510.txt":"2004-03-15","1101163572132.txt":"2004-03-05","1101163575072.txt":"2004-03-05","1101163595600.txt":"2004-03-02","1101163613791.txt":"2004-02-27","1101163706824.txt":"2004-02-09","1101163726024.txt":"2004-02-02","1101163793559.txt":"2004-01-28","1101163852029.txt":"2004-01-16","1101163853185.txt":"2004-01-15","1101163887201.txt":"2004-01-12","1101163889404.txt":"2004-01-07","1101163932216.txt":"2004-09-14","1101163941115.txt":"2004-01-01","1101163941116.txt":"2004-01-08","1101163941118.txt":"2004-01-22","1101163941120.txt":"2004-02-05","1101163941122.txt":"2004-02-19","1101163941124.txt":"2004-03-05","1101163941126.txt":"2004-03-19","1101163941128.txt":"2004-04-02","1101163941130.txt":"2004-04-16","1101163941133.txt":"2004-05-07","1101163941134.txt":"2004-05-14","1101163941136.txt":"2004-05-28","1101163941138.txt":"2004-06-11","1101163941140.txt":"2004-06-25","1101163941142.txt":"2004-07-09","1101163941144.txt":"2004-07-23","1101163941146.txt":"2004-08-06","1101163941148.txt":"2004-08-20","1101163941150.txt":"2004-09-03","1101163941152.txt":"2004-09-17","1101163941154.txt":"2004-10-01","1101163941156.txt":"2004-10-15","1101163941158.txt":"2004-10-29","1101163941160.txt":"2004-11-12","1101163941162.txt":"2004-11-26","1101163941164.txt":"2004-12-10","1101163941166.txt":"2004-12-24","1101163977242.txt":"2004-06-19","1101164682719.txt":"2004-05-06","1101234275352.txt":"2004-02-12","1101241536631.txt":"2004-08-24","1101242384726.txt":"2004-11-19","1101242385523.txt":"2004-11-17","1101242386320.txt":"2004-11-16","1101242406226.txt":"2004-11-12","1101242406742.txt":"2004-11-11","1101242407492.txt":"2004-11-10","1101242407976.txt":"2004-11-10","1101242429898.txt":"2004-11-08","1101242430883.txt":"2004-11-05","1101242451711.txt":"2004-11-04","1101242452461.txt":"2004-11-03","1101242453320.txt":"2004-11-03","1101242456221.txt":"2004-01-16","1101242473945.txt":"2004-11-01","1101242496946.txt":"2004-10-27","1101242497446.txt":"2004-10-26","1101242518040.txt":"2004-10-22","1101242518821.txt":"2004-10-20","1101242519290.txt":"2004-10-20","1101242535666.txt":"2004-09-17","1101242542555.txt":"2004-10-15","1101242543258.txt":"2004-10-15","1101242563493.txt":"2004-10-12","1101242565571.txt":"2004-10-05","1101242586149.txt":"2004-09-30","1101242587149.txt":"2004-09-27","1101242612790.txt":"2004-09-24","1101242613821.txt":"2004-09-23","1101242614337.txt":"2004-09-22","1101242614806.txt":"2004-09-22","1101242634728.txt":"2004-09-20","1101242635978.txt":"2004-09-17","1101242636712.txt":"2004-09-16","1101242656634.txt":"2004-09-15","1101242657134.txt":"2004-09-14","1101242657853.txt":"2004-09-10","1101242678228.txt":"2004-09-09","1101242678947.txt":"2004-09-08","1101242700338.txt":"2004-09-01","1101242721291.txt":"2004-08-27","1101242722744.txt":"2004-08-25","1101242743650.txt":"2004-08-24","1101242745182.txt":"2004-08-17","1101242765510.txt":"2004-08-11","1101242766213.txt":"2004-08-10","1101242766682.txt":"2004-08-10","1101242786744.txt":"2004-08-05","1101242787244.txt":"2004-08-05","1101242808401.txt":"2004-07-28","1101242809166.txt":"2004-07-27","1101242809916.txt":"2004-07-26","1101242810619.txt":"2004-07-22","1101242876245.txt":"2004-07-06","1101242898417.txt":"2004-06-29","1101242963292.txt":"2004-06-09","1101243052340.txt":"2004-04-29","1101243074777.txt":"2004-04-20","1101243160012.txt":"2004-03-29","1101243182966.txt":"2004-03-18","1101243183934.txt":"2004-03-15","1101243226622.txt":"2004-03-05","1101243250482.txt":"2004-02-18","1101243272357.txt":"2004-02-13","1101243294357.txt":"2004-02-10","1101243315873.txt":"2004-02-06","1101243381717.txt":"2004-01-23","1101243402764.txt":"2004-01-21","1101243424483.txt":"2004-01-16","1101243446514.txt":"2004-01-12","1201243446611.txt":"2004-07-14","1201243446612.txt":"2004-01-14","1201243446614.txt":"2004-08-28","1201243446615.txt":"2004-11-14"};
                    }
                );
            },//getDocDates
            getDocNumbers: function () {
                return $http.get(api + "DocNumbers.php").then(
                    function (response) {
                        sessionStorage.setItem('docNumbers', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('docNumbers'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return {"organization":["Alderwood City Council","Alderwood High School","Hospital","United Methodist Church"],"location":["Tacoma","Washington","Centennial Square"],"keyword":["teachers in Alderwood","Alderwood City","City of Alderwood","teachers don t help fix schools","school year","Alderwood","teachers","City","years","great","Panni","programs","schools","people","Blood","units","recreation","life","money","Washington"],"date":["Monday","Election","summer","last year","Saturday","Jan. 4"],"money":["$30,000","$10,000"],"person":["John Sarducci","John Panni","Aiken","Steve Evanswill","Steve Evans","Evans Olivas","Ron Olivas","Christine Gregoire","Rita Blunk","Bob Story","Max","Ella Mae Lochner","Myrtis Lang","Alice Benedetti","Phyllis Morris","Trude Meadowcroft","Letha Grubb","Lu Ann Roach","Nita Coleman","Ruth Stark","Marie Handy"]};
                    }
                );
            },//getDocNumbers
            getDocument: function (docNumber) {
                return $http.get(api + "DocFetcher.php?filename=" + docNumber).then(
                    function (response) {
                        sessionStorage.setItem('document', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('document'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return "A giant ladle, along with $200 in cash, were presented to Lupe Castro of Granger after her large crockpot";
                    }
                );
            },//getDocument
            getDocumentsByKeyword: function (keyword) {
                return $http.get(api + "KeywordMatcher.php?keyword=" + keyword).then(
                    function (response) {
                        sessionStorage.setItem('documentsByKeyword', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('documentsByKeyword'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return [
                            "1101162452451",
                            "1101162523405",
                            "1101163044539",
                            "1101163072805",
                            "1101163162978",
                            "1101163179932",
                            "1101163324807",
                            "1101163340400",
                            "1101163390822",
                            "1101163444463",
                            "1101163477635",
                            "1101163706824",
                            "1101242496946",
                            "1101242586149",
                            "1101242766682",
                            "1101242787244",
                            "1101242963292",
                            "1101243052340",
                            "1101243074777",
                            "1101243160012",
                            "1101243182966",
                            "1101243446514"
                        ];
                    }
                );
            }, //getDocumentsByKeywords
            getDocumentsByMonth: function (month) {
                return $http.get(api + "DocsByMonth.php?month=" + month).then(
                    function (response) {
                        sessionStorage.setItem('documentsByMonth', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('documentsByMonth'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return [
                            "1101163613791",
                            "1101163706824",
                            "1101163726024",
                            "1101163941120",
                            "1101163941122",
                            "1101234275352",
                            "1101243250482",
                            "1101243272357",
                            "1101243294357",
                            "1101243315873"
                        ];
                    }
                );
            }, //getDocumentsByMonth
            getFrequencyByMonth: function (keyword) {
                return $http.get(api + "FrequencyByMonth.php?keyword=" + keyword).then(
                    function (response) {
                        sessionStorage.setItem('frequencyByMonth', JSON.stringify(response.data));
                        return JSON.parse(sessionStorage.getItem('frequencyByMonth'));
                    },
                    function (httpError) {
                        //throw httpError.status + " : " + httpError.data;
                        return [
                            66,
                            119,
                            245,
                            293,
                            365,
                            417,
                            531,
                            708,
                            872,
                            1044,
                            1163,
                            1167
                        ];
                    }
                )
            },//getFreqencyByMonth

		
        };
    });
	
	
