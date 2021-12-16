function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

$(document).ready(function(){
	// build the nav
	var nav = '';
	nav += '<div class="nav-wrapper">';
		// nav += '<a href="index.html" class="brand-logo" style="padding-left: 1em; padding-right: 1em; font-size: 1.5em; font-weight: 100;">Blended PCBL</a>';
		// nav += '<a href="#" class="brand-logo"></a>';
		nav += '<a href="#" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>';
		nav += '<ul id="nav-mobile" class="right hide-on-med-and-down">';
			nav += '<li><a href="index.html">Home</a></li>';
			nav += '<li><a href="definitions.html">Definitions</a></li>';
			nav += '<li><a href="reflection.html">Reflection</a></li>';
			nav += '<li><a href="assessment.html">Assessment</a></li>';
			nav += '<li><a href="resources.html">Resources</a></li>';
			nav += '<li><a href="about.html">About</a></li>';
		nav += '</ul>';
	nav += '</div>';
	$("nav").html(nav);

	var sidenav = '';
	sidenav += '<ul class="sidenav" id="mobile-nav">';
	    sidenav += '<li><a href="index.html">Home</a></li>';
		sidenav += '<li><a href="definitions.html">Definitions</a></li>';
		sidenav += '<li><a href="reflection.html">Reflection</a></li>';
		sidenav += '<li><a href="assessment.html">Assessment</a></li>';
		sidenav += '<li><a href="resources.html">Resources</a></li>';
		sidenav += '<li><a href="about.html">About</a></li>';
	sidenav += '</ul>';
	$("nav").after(sidenav);
    $('.sidenav').sidenav();

	// build the footer
	var footer = '';
	footer += '<div class="container">';
        footer += '<div class="row">';
			footer += '<div class="col l6 s12">';
        		footer += '<p style="font-size: 0.8em;">This project was developed through a collaboration between SETDA and Dell Technologies. For additional information on building Personalized, Competency-Based Learning through Blended Learning, please contact <a href="https://www.setda.org/" target="_blank">SETDA</a> or <a href="contact.html">Dell Technologies</a>.</p>';
        		footer += '<p class="grey-text text-lighten-4" style="font-size: 0.8em;">Except where otherwise noted, this site is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons license CC BY-NC-SA 4.0</a>.</p>';
        	footer += '</div>';
      		footer += '<div class="col l4 offset-l2 s12">';
        		footer += '<ul>';
            		footer += '<li><a class="grey-text text-lighten-3" href="index.html">Home</a></li>';
					footer += '<li><a class="grey-text text-lighten-3" href="definitions.html">Definitions</a></li>';
					footer += '<li><a class="grey-text text-lighten-3" href="reflection.html">Reflection</a></li>';
					footer += '<li><a class="grey-text text-lighten-3" href="assessment.html">Assessment</a></li>';
					footer += '<li><a class="grey-text text-lighten-3" href="resources.html">Resources</a></li>';
					footer += '<li><a class="grey-text text-lighten-3" href="about.html">About</a></li>';
        		footer += '</ul>';
        	footer += '</div>';
        footer += '</div>';
  	footer += '</div>';
  	footer += '<div class="container">';
  		footer += '<div class="row">';
			footer += '<div class="col s12 dell darken-1 white-text valign-wrapper" style="padding: 0;">';
                footer += '<a href="https://www.delltechnologies.com" target="_blank" style="width: 50%; max-width: 50%;">';
                    footer += '<img src="./img/DellTech_Logo_Prm_Wht_rgb.png" style="width: 200px; display: inline-block; vertical-align: middle;">';
                footer += '</a>';
                footer += '<a href="https://www.setda.org/" target="_blank" style="width: 50%; max-width: 50%;" class="right-align">';
                    footer += '<img src="./img/logo_setda.png" style="width: 125px; display: inline-block; vertical-align: middle;">';
                footer += '</a>';
            footer += '</div>';
        footer += '</div>';
  	footer += '</div>';
	$("footer").html(footer); 

	// read json file 
	$.getJSON('js/setda-prototype-data.json', function(data){
		// console.log("success");

		// object to store questions and answers
		var answers = {};

		// BUILD ASSESSMENT
		data.forEach(function(val, ind){
			// console.log(val);
			var assessmentHtml = '';
			assessmentHtml += `<ul class="collapsible expandable">`;
			assessmentHtml += `<li><div class="collapsible-header z-depth-0" style="margin: 0; padding: 0;"><div class="card ${ val['background-color'] }" style="margin: 0; border-radius: 0; width: 100%;"><div class="card-content ${ val['text-color'] }"><span class="card-title" style="font-weight: 600;"><img src="./icon/${ val['dell-icon'] }_white-64px.png" class="dell-icon large">${ val.title }</span><span style="font-style: italic; font-size: 1.35em;">${ val.description }</span></div></div></div><div class="collapsible-body"><span>`;

			answers[val.title] = {
				'index': ind,
				'title': val.title,
				'description': val.description,
				'forAverage': [],
				'sections': {}
			};
			
			val.sections.forEach(function(v, i){
				assessmentHtml += `<div class="row"><div class="col s12"><h4 style="margin-top: 1.5em; font-weight: 300;">${ v.title }</h4></div></div>`;
				
				answers[val.title]['sections'][v.title] = {
					'index': i,
					'title': v.title,
					'questions': {}
				}
				
				v.assessment.forEach(function(w, j){
					assessmentHtml += `<div class="row"><div class="col s12"><h5 style="font-size: 1.35em;">${ w.question }</h5>`;
					assessmentHtml += `<div class="row responses" style="margin-top: 2em;">`;
					w.responses.forEach(function(x, k){
						assessmentHtml += `<div class="col s12 m6 l3"><a class="waves-effect waves-light btn dell darken-1 response-btn btn-small" style="width: 100%; margin-bottom: 1em;" data-value=${ k+1 } data-section="${ val.title.replace(/\W+/g, '').toLowerCase() }" data-section-name="${ val.title }" data-subsection-name="${ v.title }" data-question="${ w.question }">${ toTitleCase(x) }</a></div>`;
					})
					assessmentHtml += `</div></div></div>`;
					
					answers[val.title]['sections'][v.title]['questions'][w.question] = {
						'index': j,
						'question': w.question,
						'answer': 0
					}
				})
			})
			assessmentHtml += `</span></div></li></ul>`;

			$("#assessment").append(assessmentHtml);
		})

		// console.log(answers);

		var submitHtml = '';
		submitHtml += `<a name="submit"></a><div class="row" style="margin-top: 8em;">`;
			// submitHtml += `<div class="col s12 center-align response-prompt" style="margin-bottom: 2em;">`;
			// 	submitHtml += `Please answer all questions above?`;
			// submitHtml += `</div>`;
			submitHtml += `<div class="col s12 center-align">`;
				// submitHtml += `<a class="waves-effect waves-light btn-large disabled" id="submitButton" href="resources.html">`;
				submitHtml += `<a class="waves-effect waves-light btn-large dell accent-5" id="submitButton" href="resources.html">`;
					submitHtml += `<!--<i class="material-icons left">send</i>-->Submit`;
				submitHtml += `</a>`;
			submitHtml += `</div>`;
		submitHtml += `</div>`;
		$("#assessment").append(submitHtml);

		$('.response-btn').click(function(val, ind){
			var current = $(this).hasClass("accent-6") ? "accent-6" : "darken-1";
			$(this).parent(".col").parent(".row").find(".accent-6").toggleClass("accent-6").toggleClass("darken-1");
			$(this).toggleClass("darken-1");
			if(current != "accent-6"){
				$(this).toggleClass("accent-6");
			} else {
				$(this).toggleClass("darken-1")
			}

			// count how many questions have been answered
			var totalQuestions = $(".row.responses").length;
			var answered = $(".accent-6").length;
			if(answered % 5 == 0 || answered == totalQuestions){
				M.toast({html: `<div style="display: block;"><div>${answered}/${totalQuestions} completed!</div><div class="progress"><div class="determinate" style="width: ${100*answered/totalQuestions}%"></div></div><div class="center-align"><a class="waves-effect waves-light btn btn-small dell accent-5" href="#submit" style="padding: 0.75em; font-size: 0.65em; line-height: 1em; height: 2.65em;">Skip to Submit</a></div></div>`});
			}

			// count the number of rows remaining with all light-blue in order to disable the submit button
			
			// var unanswered = 0;
			// $(".row").each(function(i){
			// 	if($(this).find(".col").find(".darken-1").length == 4){
			// 		unanswered++;
			// 	};
			// })
			// console.log(unanswered);

			// if(unanswered == 0){
			// 	$("#submitButton").removeClass("disabled");
			// 	$(".response-prompt").hide();
			// } else {
			// 	$("#submitButton").addClass("disabled");
			// 	$(".response-prompt").show();
			// }
			
		})

		$("#submitButton").click(function(val, ind){
			var results = {};
			$('.response-btn.accent-6').each(function(i){
				var section = $(this).attr("data-section");
				var responseValue = $(this).attr("data-value");
				if(!results[section]){
					results[section] = {
						'name': section,
						'values': []
					}
				}
				results[section]['values'].push(responseValue);

				var sectionName = $(this).attr("data-section-name");
				var subsectionName = $(this).attr("data-subsection-name");
				var question = $(this).attr("data-question");
				//  var responseValue = $(this).attr("data-value");

				answers[sectionName]['sections'][subsectionName]['questions'][question]['answer'] = responseValue;
				answers[sectionName]['forAverage'].push(parseInt(responseValue));
			});
			Object.keys(results).forEach(function(v, i){
				var average = results[v]['values'].reduce((a,b) => parseInt(a) + parseInt(b), 0) / results[v]['values'].length;
				results[v]['average'] = average;
				sessionStorage.setItem(v, average);
			})
			
			sessionStorage.setItem('answers', JSON.stringify(answers));
		})


		// BUILD ANSWERS
		var storedAnswers = JSON.parse(sessionStorage.getItem('answers'))
		if(!!storedAnswers){
			// console.log(storedAnswers);
			
			// build answers
			var answersHTML = '';
			var responses = ['Did not answer', 'Strongly disagree', 'Disagree', 'Agree', 'Strongly Agree'];
			var responseColors = ['grey-text', 'red-text', 'red-text', 'green-text', 'green-text'];
			var comment = [' - This may be an area to focus on.', ' - This may be an area to focus on.', '', ' - This seems to be an area of strength.'];
			Object.values(storedAnswers).sort(function(a, b) {return a.index - b.index}).forEach(function(val, ind){
				answersHTML += `<div class="row">`;
					answersHTML += `<div class="col s12">`;
						answersHTML += `<h4>${val.title}</h4>`;
						var avg = (val.forAverage.reduce(function (prev, curr) {return prev + curr}, 0)/val.forAverage.length).toFixed(1);
						answersHTML += `<p style="font-size: 1.25em; font-weight: 300;">Average: ${ (val.forAverage.length > 0) ? avg : '--' }/4 <span class="${responseColors[Math.floor(avg)]}">${comment[Math.floor(avg)]}</span></p>`;
						Object.values(val.sections).sort(function(a, b) {return a.index - b.index}).forEach(function(v, i){
							answersHTML += `<div class="row">`;
								answersHTML += `<div class="col s12 m10 offset-m1">`;
									answersHTML += `<h5>${v.title}</h5>`;
									Object.values(v.questions).sort(function(a, b) {return a.index - b.index}).forEach(function(w, j){
										answersHTML += `<div class="row">`;
											answersHTML += `<div class="col s12">`;
												answersHTML += `<span style="font-weight: 700">Q: ${w.question}</span><br>`;
												answersHTML += `A: <span class="${responseColors[w.answer]}">${responses[w.answer]}</span>`;
											answersHTML += `</div>`;
										answersHTML += `</div>`;
									})
								answersHTML += `</div>`;
							answersHTML += `</div>`;
						})
					answersHTML += `</div>`;
				answersHTML += `</div>`;
			})

			$("#answers").html(answersHTML);

			// build word version of answers
			var wordHtml = '';
			Object.values(storedAnswers).sort(function(a, b) {return a.index - b.index}).forEach(function(val, ind){
				wordHtml += `<h2>${val.title}</h2>`;
				var avg = (val.forAverage.reduce(function (prev, curr) {return prev + curr}, 0)/val.forAverage.length).toFixed(1);
				wordHtml += `<p>Average: ${ (val.forAverage.length > 0) ? avg : '--' }/4 ${comment[Math.floor(avg)]}</p>`;
				Object.values(val.sections).sort(function(a, b) {return a.index - b.index}).forEach(function(v, i){
					wordHtml += `<h3>${v.title}</h3>`;
					Object.values(v.questions).sort(function(a, b) {return a.index - b.index}).forEach(function(w, j){
						wordHtml += `<p><b>Q: ${w.question}</b><br>`;
						wordHtml += `A: ${responses[w.answer]}</p>`;
					})
				})	
			})

			$("#wordAnswers").append(wordHtml);

		} else {
			$("#answers").html("<p>No answers yet. Please take the <a href='assessment.html'>Readiness Assessment</a> first.</p>")
		}
		



		// BUILD RESOURCES
		data.forEach(function(val, ind){
			// console.log(val);
			var resourcesHtml = '';
			resourcesHtml += `<div class="row"><div class="col s12"><div class="card ${ val['background-color'] }" style="margin-top: 5em;"><div class="card-content ${ val['text-color'] }"><span class="card-title" style="font-weight: 600;"><!--<i class="material-icons">${ val.icon }</i>--><img src="./icon/${ val['dell-icon'] }_white-64px.png" class="dell-icon large">${ val.title }</span><span style="font-style: italic; font-size: 1.35em;">${ val.description }</span></div></div></div></div>`;

			var sessionScore = sessionStorage.getItem(val.title.replace(/\W+/g, '').toLowerCase());
			var storedScore = (sessionScore === null) ? 'n/a' : sessionScore;

			resourcesHtml += `<ul class="collapsible col s12 m10 offset-m1">`;
				// determine if the accordion should be open or closed
				resourcesHtml += `<li class="${ (sessionScore === null || sessionScore < 3) ? 'active' : '' }">`;

					// from: https://codepen.io/j_holtslander/pen/MzNPbP
					/*
						alert card blue lighten-4 blue-text text-darken-3 w/ info
						alert card amber lighten-4 brown-text w/ report_problem
						alert card red lighten-4 red-text text-darken-4 w/ report
						alert card green lighten-4 green-text text-darken-4 w/ check_circle
					*/

					var alertConfig = {};
					if(sessionScore >= 3){
						alertConfig = {
							'divClass': 'alert card green lighten-4 green-text text-darken-4',
							'textStyle': 'green-text',
							'icon': 'check_circle',
							'mainText': 'You\'re doing AOK on this!',
							'subText': ''
						}
					} else if(sessionScore < 3){
						alertConfig = {
							'divClass': 'alert card amber lighten-4 brown-text',
							'textStyle': 'amber-text text-lighten-1',
							'icon': 'report_problem',
							'mainText': 'This is an area of improvement!',
							'subText': 'Check out the resources below.'
						}
					}

					// count the number of resources in each section
					var count = 0;
					val.sections.forEach(function(v, i){
						v.resources.forEach(function(w, j){
							count++;
						})
					})

					resourcesHtml += `<div class="collapsible-header" style="margin-top: 0;"><h5 style="font-weight: 300; margin-top: 0.25em; padding-top: 0;">`;
						if(sessionScore === null){

						} else {
							resourcesHtml += `<i class="material-icons medium left ${ alertConfig.textStyle }">${ alertConfig.icon }</i>`;
						}
						resourcesHtml += `Resources for ${ val.title } (${ count })`;
					resourcesHtml += `</h5></div>`;

					resourcesHtml += `<div class="collapsible-body"><span>`;
						// put an alert if necessary
						if(sessionScore === null){

						} else {
							resourcesHtml += `<div class="row">`;
								resourcesHtml += `<div class="${ alertConfig.divClass }" style="margin-top: -0.5em;">`;
									resourcesHtml += `<div class="card-content">`;
										resourcesHtml += `<!--<i class="material-icons">${ alertConfig.icon }</i>--><span style="font-weight: 700;">${ alertConfig.mainText }</span> ${ alertConfig.subText }`;
									resourcesHtml += `</div>`;
								resourcesHtml += `</div>`;
							resourcesHtml += `</div>`;
						}

						val.sections.forEach(function(v, i){
							var typeToIcon = {
								'article':'subject',
								'website':'web',
								'video':'play_circle_outline'
							}
							// list out resources
							v.resources.forEach(function(w, j){
								resourcesHtml += `<div class="row">`;
									resourcesHtml += `<div class="col s12">`;
										resourcesHtml += `<div style="margin-left: 2.5em;">`;
											resourcesHtml += `<span class="grey-text text-lighten-1" style="font-size: 0.8em;">${ v.title }</span>`;
										resourcesHtml += `</div>`;
										resourcesHtml += `<h5 style="font-size: 1.15em; font-weight: 400; margin-top: 0.5em;">`;
											resourcesHtml += `<a href="${ w.url }" target="_blank">`;
												resourcesHtml += `<i class="material-icons left" style="font-size: 1.15em;">${ typeToIcon[w.type] }</i>`;
												resourcesHtml += `${ w.title }`;
											resourcesHtml += `</a>`;
											resourcesHtml += ` <!--(${ toTitleCase(w.type) })-->`;
										resourcesHtml += `</h5>`;
										resourcesHtml += `<p style="margin-left: 2.25em; line-height: 1.55em;">`;
											resourcesHtml += `${ w.description } `;
											resourcesHtml += `<!--[Est. Time: ${ w['completion-time-min'] } min.]-->`;
										resourcesHtml += `</p>`;
									resourcesHtml += `</div>`;
								resourcesHtml += `</div>`;
							})		
						})
					resourcesHtml += `</span></div>`;
				resourcesHtml += `</li>`;
			resourcesHtml += `</ul>`;

			$("#resources").append(resourcesHtml);
		})

		$('.collapsible').collapsible();
		var elem = document.querySelector('.collapsible.expandable');
		var instance = M.Collapsible.init(elem, {
		  accordion: false
		});


		// BUILD REFLECTION
		var placeholders = ["Start capturing your thoughts here...", "Curious what you think of this one.", "Stream of consciousness to get started?"]
		data.forEach(function(val, ind){
			// console.log(val);
			var responsesHtml = ''
			responsesHtml += `<li><div class="collapsible-header card-title ${ val['background-color'] } ${ val['text-color'] }" style="font-size: 1.45em; font-weight: 600;"><!--<i class="material-icons">${ val.icon }</i>--><img src="./icon/${ val['dell-icon'] }_white-64px.png" class="dell-icon">${ val.title }</div><div class="collapsible-body"><span><span style="font-style: italic;">${ val.description }</span>`;

			val.sections.forEach(function(v, i){
				responsesHtml += `<h3 style="font-size: 1.5em; font-weight: 700;">${ v.title }</h3>`;
				v.responses.forEach(function(w, j){
					responsesHtml += `<div class="row"><div class="col s12"><h4 style="font-size: 1.25em; padding-left: 0.75em; font-wight: 400;">${ w.question }</h4>`;
					if(w.hasOwnProperty('subquestions')){
						w.subquestions.forEach(function(x, k){
							responsesHtml += `<h6 style="font-size: 0.95em; padding-left: 1.5em; font-weight: 300;">${ x }</h6>`
						})
					}
					// check session storage for any stored values
					var sessionText = sessionStorage.getItem(w.question.replace(/\W+/g, '').toLowerCase());
					var storedText = (sessionText === null) ? '' : sessionText;
					responsesHtml += `<div class="input-field col s12"><textarea id="${ w.question.replace(/\W+/g, '').toLowerCase() }" class="materialize-textarea" placeholder="${ placeholders[Math.floor(placeholders.length*Math.random())] }">${ storedText }</textarea></div></div></div>`
				})
			})
			responsesHtml += `</span></div></li>`;
			$("#responses").append(responsesHtml);


			// build "hidden" table form of data
			var excelHtml = '';
			excelHtml += `<tr><td><b>${ val.title.toUpperCase() }</b></td><td>${ val.description }</td></tr>`;
			excelHtml += `<tr><td></td><td></td></tr>`;
			val.sections.forEach(function(v, i){
				excelHtml += `<tr><td><b>${ v.title }</b></td><td></td></tr>`;
				v.responses.forEach(function(w, j){
					excelHtml += `<tr><td>${ w.question }`;
					if(w.hasOwnProperty('subquestions')){
						w.subquestions.forEach(function(x, k){
							excelHtml += `<br><i> ${ x }</i>`
						})
					}
					// check session storage for any stored values
					var sessionText = sessionStorage.getItem(w.question.replace(/\W+/g, '').toLowerCase());
					var storedText = (sessionText === null) ? '' : sessionText;
					excelHtml += `</td><td class="${ w.question.replace(/\W+/g, '').toLowerCase() }">${ storedText }</td></tr>`;
				})
				excelHtml += `<tr><td></td><td></td></tr>`;
			})
			$("#excelTable").append(excelHtml);

			// build "hidden" word version of data
			var excelHtml = '';
			excelHtml += `<h2>${ val.title }</h2><br>${ val.description }`;
			excelHtml += `<br><br>`;
			val.sections.forEach(function(v, i){
				excelHtml += `<h4>${ v.title }</h4>`;
				v.responses.forEach(function(w, j){
					excelHtml += `<p><b>${ w.question }</b>`;
					if(w.hasOwnProperty('subquestions')){
						w.subquestions.forEach(function(x, k){
							excelHtml += `<br><i> ${ x }</i>`
						})
					}
					// check session storage for any stored values
					var sessionText = sessionStorage.getItem(w.question.replace(/\W+/g, '').toLowerCase());
					var storedText = (sessionText === null) ? '' : sessionText;
					excelHtml += `</p><p class="${ w.question.replace(/\W+/g, '').toLowerCase() }">${ storedText }</p>`;
				})
				excelHtml += `<br><br>`;
			})
			$("#wordVersion").append(excelHtml);



		})

		// capture changes to any text area in session storage
		$("textarea").keyup(function(){
			var id = $(this).attr("id");
			var text = $(this).val();
			sessionStorage.setItem(id, text);

			$(`.${id}`).html(text);
		})
	})

	// initiate the collapsible
	$('.collapsible').collapsible();
	var elem = document.querySelector('.collapsible.expandable');
	var instance = M.Collapsible.init(elem, {
	  accordion: false
	});

	// initiate any text fields
	M.updateTextFields();

	// initialize the select
	$('select').formSelect();

	// initialize the floating action button
	$('.fixed-action-btn').floatingActionButton();

	// initialize the tap target
	$('.tap-target').tapTarget();

	// initialize tooltips
	$('.tooltipped').tooltip();

	$('.word').click(function(){
		// console.log("word button clicked");

		// from: https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/
		function Export2Word(element, filename = ''){
		    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
		    var postHtml = "</body></html>";
		    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

		    var blob = new Blob(['\ufeff', html], {
		        type: 'application/msword'
		    });
		    
		    // Specify link url
		    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
		    
		    // Specify file name
		    filename = filename?filename+'.doc':'setda-readiness-reflection.doc';
		    
		    // Create download link element
		    var downloadLink = document.createElement("a");

		    document.body.appendChild(downloadLink);
		    
		    if(navigator.msSaveOrOpenBlob ){
		        navigator.msSaveOrOpenBlob(blob, filename);
		    }else{
		        // Create a link to the file
		        downloadLink.href = url;
		        
		        // Setting the file name
		        downloadLink.download = filename;
		        
		        //triggering the function
		        downloadLink.click();
		    }
		    
		    document.body.removeChild(downloadLink);
		}
		Export2Word("wordVersion");
	})

	$('.excel').click(function(){
		// console.log("excel button clicked");

		/*
		// throws an error when opening file as .xls since not .xlsx
		// from: https://www.codegrepper.com/code-examples/javascript/javascript+save+table+as+excel
		function exportTableToExcel(tableID, filename = '') {
	        var downloadLink;
	        var dataType = 'application/vnd.ms-excel';
	        var tableSelect = document.getElementById(tableID);
	        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

	        // Specify file name
	        filename = filename ? filename + '.xls' : 'setda-readiness-reflection.xls';

	        // Create download link element
	        downloadLink = document.createElement("a");

	        document.body.appendChild(downloadLink);

	        if (navigator.msSaveOrOpenBlob) {
	            var blob = new Blob(['\ufeff', tableHTML], {
	                type: dataType
	            });
	            navigator.msSaveOrOpenBlob(blob, filename);
	        } else {
	            // Create a link to the file
	            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
	            // Setting the file name
	            downloadLink.download = filename;

	            //triggering the function
	            downloadLink.click();
	        }
	    }
	    */
	    // exportTableToExcel('excelTable');

	    // from: https://stackoverflow.com/questions/16078544/export-to-csv-using-jquery-and-html/16203218
	    function exportTableToCSV($table, filename) {

		    var $rows = $table.find('tr:has(td)'),

		      // Temporary delimiter characters unlikely to be typed by keyboard
		      // This is to avoid accidentally splitting the actual contents
		      tmpColDelim = String.fromCharCode(11), // vertical tab character
		      tmpRowDelim = String.fromCharCode(0), // null character

		      // actual delimiter characters for CSV format
		      colDelim = '","',
		      rowDelim = '"\r\n"',

		      // Grab text from table into CSV formatted string
		      csv = '"' + $rows.map(function(i, row) {
		        var $row = $(row),
		          $cols = $row.find('td');

		        return $cols.map(function(j, col) {
		          var $col = $(col),
		            text = $col.text();

		          return text.replace(/"/g, '""'); // escape double quotes

		        }).get().join(tmpColDelim);

		      }).get().join(tmpRowDelim)
		      .split(tmpRowDelim).join(rowDelim)
		      .split(tmpColDelim).join(colDelim) + '"';

		    // Deliberate 'false', see comment below
		    if (false && window.navigator.msSaveBlob) {

		      var blob = new Blob([decodeURIComponent(csv)], {
		        type: 'text/csv;charset=utf8'
		      });

		      // Crashes in IE 10, IE 11 and Microsoft Edge
		      // See MS Edge Issue #10396033
		      // Hence, the deliberate 'false'
		      // This is here just for completeness
		      // Remove the 'false' at your own risk
		      window.navigator.msSaveBlob(blob, filename);

		    } else if (window.Blob && window.URL) {
		      // HTML5 Blob        
		      var blob = new Blob([csv], {
		        type: 'text/csv;charset=utf-8'
		      });
		      var csvUrl = URL.createObjectURL(blob);

		      $(this)
		        .attr({
		          'download': filename,
		          'href': csvUrl
		        });
		    } else {
		      // Data URI
		      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

		      $(this)
		        .attr({
		          'download': filename,
		          'href': csvData,
		          'target': '_blank'
		        });
		    }
		}
		var args = [$('#excelTable'), 'setda-readiness-reflection.csv'];
    	exportTableToCSV.apply(this, args);
	})

	$('.pdf').click(function(){
		// console.log("PDF button clicked");

		// from: https://pspdfkit.com/blog/2019/html-to-pdf-in-javascript/
		// and: https://ekoopmans.github.io/html2pdf.js/
		
        // Choose the element and save the PDF for our user.
        var opt = {
		  margin: [0.5, 1],
		  filename: 'setda-readiness-reflection.pdf',
		  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
		};
        html2pdf()
        	.set(opt)
          	.from($('#wordVersion').html())
          	.save();
	    
	})

	$('.print').click(function(){
		// console.log("print button clicked");
		
		// open all collapsibles
		$('.collapsible').collapsible('open');

		setTimeout(function(){
			// print
			window.print();
		}, 600);
	})

	$('#big-button-for-answers').click(function(){
		console.log("word button clicked");

		// from: https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/
		function Export2Word(element, filename = ''){
		    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
		    var postHtml = "</body></html>";
		    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

		    var blob = new Blob(['\ufeff', html], {
		        type: 'application/msword'
		    });
		    
		    // Specify link url
		    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
		    
		    // Specify file name
		    filename = filename?filename+'.doc':'setda-assessment-responses.doc';
		    
		    // Create download link element
		    var downloadLink = document.createElement("a");

		    document.body.appendChild(downloadLink);
		    
		    if(navigator.msSaveOrOpenBlob ){
		        navigator.msSaveOrOpenBlob(blob, filename);
		    }else{
		        // Create a link to the file
		        downloadLink.href = url;
		        
		        // Setting the file name
		        downloadLink.download = filename;
		        
		        //triggering the function
		        downloadLink.click();
		    }
		    
		    document.body.removeChild(downloadLink);
		}
		Export2Word("wordAnswers");
	})


	$('.parallax').parallax();
})

$("form").submit(function(e) {
	// from: https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
    
    e.preventDefault();

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbz9gF9_yQwbSobuA0qH7YfuUeldZs-3X6tmh84_k_W0A-ZYSywG/exec',
        method: 'GET',
        dataType: 'json',
        data: {
        	'first': $('input[name="first"]').val(),
        	'last': $('input[name="last"]').val(),
        	'email': $('input[name="email"]').val(),
        	'tel': $('input[name="tel"]').val(),
        	'state': $('select[name="state"]').val(),
        	'role': $('select[name="role"]').val(),
        	'message': $('textarea[name="message"]').val(),
        	'email-contact': $('input[name="email-contact"]').val(),
        	'phone-contact': $('input[name="phone-contact"]').val()
        },
        success: function(){
        	console.log("success");
            $('#contact-form').hide();
           	$("#send-success").show();
        },
        error: function(){
        	console.log("error")
        }
    });
    
    
})