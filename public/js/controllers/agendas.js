angular.module('mean.system').controller('AgendasController', ['$scope', 'Global', 'Agendas', '$routeParams',
    function($scope, Global, Agendas, $routeParams) {
        $scope.byParties = true;
        $scope.byScore = true;
        
        console.log($routeParams);


        $scope.findOne = function() {
            if ($routeParams.partyId){

            }
            Agendas.getAgenda($routeParams.agendaId, function(agenda) {
                $scope.agenda = agenda;
                $scope.initAgendasChart();
                // $scope.parties ;// = agenda.parties.map(function(x){return x.name;});
            });
        };
        //

        $scope.initAgendasChart = function() {//display data by parties or by members
            $scope.agendasChart = chart;
            parties = [];
            names = [];
            members = [];
            if ($scope.byParties){//display data by parties
               
                for (var party in $scope.agenda.parties){
                    if ($scope.score)
                        parties.push($scope.agenda.parties[party].score);
                    else
                        parties.push($scope.agenda.parties[party].volume);
                    names.push($scope.agenda.parties[party].name);
                }
                console.log(parties);
                if ($scope.score)
                    $scope.agendasChart.title.text = "מפלגות לפי ציון";
                else
                     $scope.agendasChart.title.text = "מפלגות לפי הצבעות";

                  $scope.agendasChart.series = [{
                      "data": parties
                  }];

                }
                else{//display data by members
                    $scope.party_id = $routeParams.partyId;
                    partyMembers = $scope.filterMembers();
                    console.log(partyMembers);

                    for (var member in partyMembers){

                        if ($scope.score)
                            members.push(member);
                            // members.push(partyMembers[member].score);
                        else
                            members.push(member);
                            // members.push(partyMembers[member].volume);
                        names.push(partyMembers[member].name);
                    }
                    console.log(members);
                    console.log(names);
                   if ($scope.score)
                      $scope.agendasChart.title.text = "חברי כנסת לפי ציון";
                    else
                      $scope.agendasChart.title.text = "חברי כנסת לפי הצבעות";

                  $scope.agendasChart.series = [{
                      "data": members
                  }];
                }
                $scope.agendasChart.xAxis.categories = names;

        };

        var chart = {
            // "chart" : {},
            "title": {},
            "yAxis" : {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function(){
                            return this.value;}
                    }
                },
                "xAxis" :{
                    opposite : true,
                    reversed: false, labels: {step: 1}
            }
        };

    $scope.selectParty = function(party){
        $scope.party_id = parseInt((party.absolute_url.match(/\d{2}/) || party.absolute_url.match(/\d/))[0]);
        $scope.initAgendasChart();
    }

    $scope.filterMembers = function(){
        return $scope.agenda.members.filter(function(member){
          if(member.party_id == $scope.party_id)
            return member;
        });

     };
 }

]);



//TODO:
    //1. sort the results  
    //2. find the members of a party -Done!!!
    //
//Questions:
    //1. what is the fields for score & votes of members?
    //2. what is the opposite votes?
    //3. how to get the dates?
    //4. should we implement only the chart or all the page?

