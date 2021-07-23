const qNa_testData =
  // { product_id:"28212",
  //   results:
  //   [
  //     { question_id:213335,
  //       question_body: "test",
  //       question_date:"2019-01-17T00:00:00.000Z",
  //       asker_name:"rob",
  //       question_helpfulness:2,
  //       reported:false,
  //       "answers":
  //         { 1992397:
  //             { id:1992397,
  //               body:"I've thrown it in the wash and it seems fine",
  //               date:"2018-02-08T00:00:00.000Z",
  //               answerer_name:"marcanthony",
  //               helpfulness:8,"photos":[]
  //             },
  //         }
  //     },
  //     { question_id:213335,
  //       question_body: "test2",
  //       question_date:"2019-01-17T00:00:00.000Z",
  //       asker_name:"rob",
  //       question_helpfulness:3,
  //       reported:false,
  //       "answers":
  //         { 1992397:
  //             { id:1992397,
  //               body:"I've thrown it in the wash and it seems fine",
  //               date:"2018-02-08T00:00:00.000Z",
  //               answerer_name:"marcanthony",
  //               helpfulness:8,"photos":[]
  //             },
  //         }
  //     },
  //     { question_id:213337,
  //       question_body:"Can I wash it?",
  //       question_date:"2018-02-08T00:00:00.000Z",
  //       asker_name:"cleopatra",
  //       question_helpfulness:7,
  //       reported:false,
  //       answers:
  //         { 1992397:
  //           { id:1992397,
  //             body:"I've thrown it in the wash and it seems fine",
  //             date:"2018-02-08T00:00:00.000Z",
  //             answerer_name:"marcanthony",
  //             helpfulness:8,"photos":[]
  //           },
  //           1992415:
  //           { id:1992415,
  //             body:"It says not to",
  //             date:"2018-03-08T00:00:00.000Z",
  //             answerer_name:"ceasar",
  //             helpfulness:0,
  //             photos:[]
  //           },
  //           1992447:
  //           { id:1992447,
  //             body:"I wouldn't machine wash it",
  //             date:"2018-03-08T00:00:00.000Z",
  //             answerer_name:"ceasar",
  //             helpfulness:1,
  //             photos:[]
  //           },
  //           1992452:
  //           { id:1992452,
  //             body:"Only if you want to ruin it!",
  //             date:"2018-03-08T00:00:00.000Z",
  //             answerer_name:"ceasar",
  //             helpfulness:5,
  //             photos:[]},
  //           1992458:
  //           { id:1992458,
  //             body:"Yes",
  //             date:"2018-03-08T00:00:00.000Z",
  //             answerer_name:"Seller",
  //             helpfulness:4,"photos":[]}}
  //           },
  //     { question_id:213336,
  //       question_body:"How long does it last?",
  //       question_date:"2019-07-06T00:00:00.000Z",
  //       asker_name:"funnygirl",
  //       question_helpfulness:6,
  //       reported:false,
  //       answers:
  //         { 1992416:
  //           { id:1992416,
  //             body:"It runs small",
  //             date:"2019-11-17T00:00:00.000Z",
  //             answerer_name:"dschulman",
  //             helpfulness:1,
  //             photos:
  //             [
  //               "https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80","https://images.unsplash.com/photo-1536922645426-5d658ab49b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
  //             ]},
  //         1992440:
  //           { id:1992440,
  //             body:"Showing no wear after a few months!",
  //             date:"2019-09-06T00:00:00.000Z",
  //             answerer_name:"sillyguy",
  //             helpfulness:8,
  //             photos:[]}}
  //           },
  //     { question_id:213333,
  //       question_body:"What fabric is the top made of?",
  //       question_date:"2018-01-04T00:00:00.000Z",
  //       asker_name:"yankeelover",
  //       question_helpfulness:1,
  //       reported:false,
  //       answers:
  //         { 1992356:
  //             { id:1992356,
  //               body:"Something pretty soft but I can't be sure",
  //               date:"2018-01-04T00:00:00.000Z",
  //               answerer_name:"metslover",
  //               helpfulness:5,
  //               photos:
  //               [
  //                 "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80","https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80","https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
  //               ]},
  //           1992358:
  //             { id:1992358,
  //               body:"Its the best! Seriously magic fabric",
  //               date:"2018-01-04T00:00:00.000Z",
  //               answerer_name:"metslover",
  //               helpfulness:7,
  //               photos:[]
  //             },
  //           1992359:
  //             { id:1992359,
  //               body:"DONT BUY IT! It's bad for the environment",
  //               date:"2018-01-04T00:00:00.000Z",
  //               answerer_name:"metslover",
  //               helpfulness:8,"photos":[]
  //             },
  //           1992408:
  //             { id:1992408,
  //               body:"Suede",
  //               date:"2018-11-04T00:00:00.000Z",
  //               answerer_name:"metslover",
  //               helpfulness:7,
  //               photos:[]
  //             },
  //           1992446:
  //             { id:1992446,
  //               body:"Supposedly suede, but I think its synthetic",
  //               date:"2018-12-04T00:00:00.000Z",
  //               answerer_name:"metslover",
  //               helpfulness:3,
  //               photos:[]}}
  //             },


  //   ]
  // }
 { product_id:"28213",
   results:
     [
       { question_id:213343,
         question_body:"Where does this product ship from?",
         question_date:"2018-01-06T00:00:00.000Z",
         asker_name:"jbilas",
         question_helpfulness:36,
         reported:false,
         answers:
           { 1992374:
              { id:1992374,
               body:"It ships from the facility in Tulsa",
               date:"2018-01-06T00:00:00.000Z",
               answerer_name:"dschulman",
               helpfulness:30,
               photos:[]},
             2171318:
              { id:2171318,
                body:"This is my test answer",
                date:"2021-07-23T00:00:00.000Z",
                answerer_name:"testUsername123",
                helpfulness:0,
                photos:
                  [
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png"
                  ]}}},
        { question_id:213345,
          question_body:"What fabric is the bottom made of?",
          question_date:"2019-02-18T00:00:00.000Z",
          asker_name:"cleopatra",
          question_helpfulness:21,
          reported:false,
          answers:
            { 1992353:
               { id:1992353,
                 body:"Some kind of recycled rubber, works great!",
                 date:"2019-03-18T00:00:00.000Z",
                 answerer_name:"marcanthony",
                 helpfulness:14,
                 photos:[]},
              1992367:
               { id:1992367,
                body:"Rubber",
                date:"2019-03-18T00:00:00.000Z",
                answerer_name:"Seller",
                helpfulness:12,
                photos:[]}}},
        { question_id:213346,
          question_body:"Where is this product made?",
          question_date:"2018-10-04T00:00:00.000Z",
          asker_name:"jbilas",
          question_helpfulness:14,
          reported:false,
          answers:
            { 1992368:
               { id:1992368,
                body:"China",
                date:"2018-08-04T00:00:00.000Z",
                answerer_name:"Seller",
                helpfulness:13,
                photos:[]},
              2171319:
               { id:2171319,
                 body:"This is my test answer",
                 date:"2021-07-23T00:00:00.000Z",
                 answerer_name:"testUsername123",
                 helpfulness:0,
                 photos:
                   ["https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png"
                  ]},
              2171326:
                { id:2171326,
                  body:"This is my test answer",
                  date:"2021-07-23T00:00:00.000Z",
                  answerer_name:"testUsername123",
                  helpfulness:0,
                  photos:
                    ["https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png",
                    "https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png"
                    ]}}},
        { question_id:213340,
          question_body:"yooo",
          question_date:"2019-01-24T00:00:00.000Z",
          asker_name:"rob",
          question_helpfulness:14,
          reported:false,
          answers:
            { 1992400:
               { id:1992400,
                 body:"Yes",
                 date:"2019-11-24T00:00:00.000Z",
                 answerer_name:"rob",
                 helpfulness:15,
                 photos:[]
            }}}
          ]

          }


  export default qNa_testData;


