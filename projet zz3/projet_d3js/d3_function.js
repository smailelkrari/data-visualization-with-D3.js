			var donnees = [
				{annee: 2001,gdp: 0.8 ,chiffre_af:0 },
				{annee: 2002,gdp: 1.6  ,chiffre_af:0},
				{annee: 2003,gdp: 2.04 ,chiffre_af:0},
				{annee: 2004,gdp: 3.8  ,chiffre_af:0},
				{annee: 2005,gdp: 4.5  ,chiffre_af:0},
				{annee: 2006,gdp: 5.8 ,chiffre_af:200},
				{annee: 2007,gdp: 6.2  ,chiffre_af:300},
				{annee: 2008,gdp: 8.33,chiffre_af:900},
				{annee: 2009,gdp: 9.8  ,chiffre_af:750},
				{annee: 2010,gdp: 10.6  ,chiffre_af:800},
				{annee: 2011,gdp: 11.5  ,chiffre_af:850},
				{annee: 2012,gdp: 11.3  ,chiffre_af:1133}
			];
			$(function () {
					$('.tip').tooltip({container: 'body'});
					});
			draw_first_graph(donnees);
			draw_third_graph(donnees);
			graph_zoom();
			window.onresize = function(){ location.reload(); }
// Premier graphe
function draw_first_graph(data){
	//On récupère la largeur de l'écran
	var margin={top:28, right:65, bottom:100, left:40},
		ww=document.getElementById("chart").clientWidth,
		width=ww-margin.right-margin.left,
		height=500-margin.top-margin.bottom-100;
	var barPadding = 1;
	var svg=d3.select('#chart')
		.append('svg')
		.attr("width", width+margin.right+margin.left)
		.attr("height", height+margin.top+margin.bottom)
		.append('g')
		.attr ("transform","translate("+ margin.left +','+margin.top+ ')');
		
	// définition gradiant
		definition_gradiant(32);
		definition_gradiant(33);
		definition_gradiant(49);
		definition_gradiant(50);
	//définition des highcharts
		definition_stop(32,0,"#82A600");
		definition_stop(32,1,"#94C600");
		definition_stop(33,0,"#FF6700");
		definition_stop(33,1,"#FFA000");
		
	//Echelles
	var xScale= d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2,0.1);
	var yScale= d3.scale.linear()
		.range([height,0]);
	var yScale_2= d3.scale.linear() 
		.range([height,0]);
	// Axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);
	var yAxis_2 = d3.svg.axis()
		.scale(yScale_2)
		.orient("right")
		.ticks(5);
	
	var div = d3.select("body").append("div")
				.attr("class", "tooltip1");
	var path_ = svg.append("path")
				.attr("id","path1")
				.attr("d","M 50 "+height+" L 50 0");
	
				
		// on définit les domaines des échelles
		xScale.domain(data.map(function(d){return d.annee}));
		yScale.domain([0,d3.max(data, function(d) {return d.gdp;})]);
		yScale_2.domain([0,d3.max(data, function(d) {return d.chiffre_af;})]);
		
		//Titre graphe et titre à droite
		graph_title(svg,width,"CA France");
		svg.append('text')
			.text("CA")
			.attr("class","titre_droite")
			.attr("transform", "translate("+(width+45)+","+(height/2)+") rotate(90)");
		//Dessiner l'axe des X et l'axe des Y
		draw_axis_x(svg, width,height,data,"text_x_axis");
		
		draw_axis_y_left(svg, width,height,data,"y_axis");
		draw_axis_y_right(svg, width,height,data,"y_axis_2");
		
		//la grille
		tracer_grille(svg,width,yScale,data);
			
		//On trace notre graphe
		draw_graph_one_bar(svg,data,width,height,"url(#highcharts-32)",xScale, yScale,3008,div,path_,"path1");
		//On trace la ligne
		draw_line(svg,data,xScale, yScale_2,"ligne");
		
		draw_point(svg,data,5,xScale,yScale_2,"#FF6700",1,"white","cercle_i",1,"hidden");
		draw_point(svg,data,10,xScale,yScale_2,"#FF6700",0,"white","cercle_h",0.2,"hidden");
		
}
//Graphe pour pop-up

function draw_second_graph(data){
	d3.select('#svg_2').remove();
	var ww=550;
	if($(window).width()<=550) ww=$(window).width()-80;
	var margin={top:28, right:45, bottom:100, left:40},
		width=ww-margin.right-margin.left,
		height=400-margin.top-margin.bottom;
	var barPadding = 1;
	var div_ = d3.select("#chart_2").append("div")
				.attr("class", "tooltip1")
				.style("opacity", 1e-6);
	var svg=d3.select('#chart_2')
		.append('svg')
		.attr("width", width+margin.right+margin.left)
		.attr("height", height+margin.top+margin.bottom)
		.attr("id","svg_2")
		.append('g')
		.attr ("transform","translate("+ margin.left +','+margin.top+ ')');
	//Echelle
	var xScale= d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2,0.1);
	var yScale= d3.scale.linear()
		.range([height,0]);
	var yScale_2= d3.scale.linear() //pour chiffre d'affaire ligne
		.range([height,0]);
	// axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(3)
		;
	var yAxis_2 = d3.svg.axis()
		.scale(yScale_2)
		.orient("right")
		.ticks(3);
	
	var path_ = svg.append("path")
				.attr("id","path2")
				.attr("d","M 50 "+height+" L 50 0");
	
		xScale.domain(data.map(function(d){return d.annee}));
		yScale.domain([0,d3.max(data, function(d) {return d.gdp;})]);
		yScale_2.domain([0,d3.max(data, function(d) {return d.chiffre_af;})]);
		
		//titre graphe
		graph_title(svg,width,"CA France");
		//dessiner l'axe des X et l'axe des Y
		draw_axis_x(svg, width,height,data,"text_x_axis");
		draw_axis_y_left(svg, width,height,data,"y_axis");
		draw_axis_y_right(svg, width,height,data,"y_axis_2");
		//la grille
		tracer_grille(svg,width,yScale,data);	
		//Le graphe
		draw_graph_one_bar(svg,data,width,height,"url(#highcharts-32)",xScale, yScale,3008,div_, path_,"path2");
}

// fonction cas de deux bars

function draw_third_graph(data){
	var margin={top:28, right:45, bottom:100, left:40},
		ww=document.getElementById("chart2").clientWidth,
		width=ww-margin.right-margin.left,
		height=400-margin.top-margin.bottom;
	var barPadding = 1;
	var div_ = d3.select("body").append("div")
				.attr("class", "tooltip1")
				.style("opacity", 1e-6);
	var svg=d3.select('#chart2')
		.append('svg')
		.attr("width", width+margin.right+margin.left)
		.attr("height", height+margin.top+margin.bottom)
		.attr("id","svg_3")
		.append('g')
		.attr ("transform","translate("+ margin.left +','+margin.top+ ')');
	//Echelle
	var xScale= d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2,0.1);
	var yScale= d3.scale.linear()
		.range([height,0]);
	var yScale_2= d3.scale.linear() //pour chiffre d'affaire ligne
		.range([height,0]);
	// axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);
	var yAxis_2 = d3.svg.axis()
		.scale(yScale_2)
		.orient("right")
		.ticks(5);
	var id_path="path3";
	var path_ = svg.append("path")
				.attr("id",id_path)
				.attr("d","M 50 "+height+" L 50 0");
				
		xScale.domain(data.map(function(d){return d.annee}));
		yScale.domain([0,d3.max(data, function(d) {return d.gdp;})]);
		yScale_2.domain([0,d3.max(data, function(d) {return d.chiffre_af;})]);
		
		//titre graphe
		graph_title(svg,width,"CA France");
		//dessiner l'axe des X et l'axe des Y
		draw_axis_x(svg, width,height,data,"text_x_axis");
		draw_axis_y_left(svg, width,height,data,"y_axis");
		draw_axis_y_right(svg, width,height,data,"y_axis_2");
		//la grille
		tracer_grille(svg,width,yScale,data);
		//tracer le graphe
		draw_graph_tow_bar(svg,data,height,"url(#highcharts-32)" ,"url(#highcharts-33)",xScale, yScale,yScale_2,div_,path_,id_path);		
}



/*
*
*
Fonctions élémentaires 
*
*
*/
//Définition des balises gradiant
function definition_gradiant(num_highcharts){
		d3.select('svg')
			.append('defs')
			.append('linearGradient')
			.attr("id","highcharts-"+num_highcharts);
}
//Définition des balises stop
function definition_stop(num_highcharts, valeur_offset,valeur_coleur) {
	d3.select('#highcharts-'+num_highcharts)
			.append('stop')
			.attr("offset",""+valeur_offset)
			.attr("stop-color",""+valeur_coleur)
			.attr("stop-opacity","1");
}
//Dessiner l'axe des X
function draw_axis_x(svg, width,height,data,class_name){
	//Echelle
	var xScale= d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2,0.1);
	// Axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	// Définir le domaine
	xScale.domain(data.map(function(d){return d.annee}));// pensez à modifier le nom du champ si vous changez le jeux de données
	//Dessiner xaxis et yaxis
		svg.append("g")
			.attr("class", "x_axis")
			.attr("transform", "translate(0,"+height+")")
			.call(xAxis)
			.selectAll('text')
			.attr("class",class_name)
			.attr("transform","rotate(-60)")
			.attr("dx","-.8em")
			.attr("dy",".25em")
			.style("text-anchor","end");
}

//dessiner l'axe des Y à gauche
function draw_axis_y_left(svg, width,height,data,class_name){
	var yScale= d3.scale.linear()
		.range([height,0]);
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);
	yScale.domain([0,d3.max(data, function(d) {return d.gdp;})]);
	svg.append("g")
			.attr("class",class_name )
			.call(yAxis);
}
//dessiner l'axe des Y à droite
function draw_axis_y_right(svg, width,height,data,class_name){
	var yScale_2= d3.scale.linear() 
		.range([height,0]);
	var yAxis_2 = d3.svg.axis()
		.scale(yScale_2)
		.orient("right")
		.ticks(5);
	yScale_2.domain([0,d3.max(data, function(d) {return d.chiffre_af;})]);
	svg.append("g")
		.attr("class", class_name)
		.attr("transform", "translate("+width+",0)")
		.call(yAxis_2);
	
}
//Fonction la grille de l'axe des Y
function tracer_grille(svg,width,yScale,data){
		svg.selectAll("y_axis").data(yScale.ticks(5)).enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x2", width)
        .attr("y1", function(d){ return yScale(d);})
        .attr("y2", function(d){ return yScale(d);});
}

// Fonction pour tracer la ligne
function draw_line(svg1, data, xScale, yScale,class_name){
	var valueline = d3.svg.line();
	//Tracer la ligne 
	valueline.x(function (d) { return xScale(d.annee) + (xScale.rangeBand() / 2); })
             .y(function (d) { return yScale(d.chiffre_af); });
	// On appelle ici la fonction valueline qui donne les coordonnées à relier à la ligne.
	// On les append à notre path	
	svg1.append("path")      
        .data(data)
		.attr("class",class_name)
		.attr("fill", "none")
        .attr("d", valueline(data));
}
// Fonction pour tracer le graphe
function draw_graph_one_bar(svg,data,width,height,valeur_coleur,xScale, yScale,duree_transition,div_tooltip, path_cadre,id_path){
		//les rectangles
		svg.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr("height",0)
			.attr("y", height)
			.attr("id",function(d,i) {return i;})
			.on("mouseover", function(d,i) { 
					document.getElementById(i).style.stroke="white";
					div_tooltip.transition()        
						.duration(200)      
						.style("opacity", .9);      
					div_tooltip.html("CA en France pour l'année:"+d.annee + "<br/><span class='vert'>Dettes :</span>"+ d.gdp
							+ "<br/><span class='orange'>CA :</span>"+ d.chiffre_af)  
						.style("left",(d3.event.pageX + 10) + "px")     
						.style("top", (d3.event.pageY - 28) + "px"); 
					document.getElementById(id_path).style.visibility="visible";
					path_cadre.attr("d","M "+(xScale(d.annee)+35)+" "+height+" L "+(xScale(d.annee)+35)+" 0");
					if(valeur_coleur=="url(#highcharts-32)")
					{
						this.setAttribute("fill", "	rgb(155,206,0)");	//	modifier la coleur du rectangle en survolant
					}
					if(document.getElementById("cercle_i"+i)!= null && document.getElementById("cercle_h"+i)!= null)
					{
						document.getElementById("cercle_i"+i).setAttribute("visibility","visible");
						document.getElementById("cercle_h"+i).setAttribute("visibility","visible");
					}
				})                  
			.on("mouseout", function(d,i) {       
					document.getElementById(i).style.stroke="#FFFFFF";
					div_tooltip.transition()        
						.duration(200)      
						.style("opacity", 0); 
					document.getElementById(id_path).style.visibility="hidden";
					this.setAttribute("fill", valeur_coleur);// retour coleur initiale en quittant le rectangle
					if(document.getElementById("cercle_i"+i)!= null && document.getElementById("cercle_h"+i)!= null)
					{
						document.getElementById("cercle_i"+i).setAttribute("visibility","hidden");
						document.getElementById("cercle_h"+i).setAttribute("visibility","hidden");
					}
				})
			.on("click",function(d) { 
					document.getElementById("title_rect").innerHTML ="CA pour l'année "+d.annee;
					draw_second_graph(data);
			})
			.transition().duration(duree_transition)
			//.delay(function(d,i){return i*200 ;})
			.attr({
				"x":function(d){return xScale(d.annee)+8;},
				"y":function(d){return yScale(d.gdp);},
				"width":xScale.rangeBand()/1.5,
				"height":function(d){return height - yScale(d.gdp);}
				})
			 .attr("fill", valeur_coleur)
			 .attr("data-toggle","modal")
			 .attr('data-target','#myModal');
}
//Fonction pour deux histogrammes
function draw_graph_tow_bar(svg,data,height,valeur_coleur_histo1,valeur_coleur_histo2,xScale, yScale,yScale_2,div_,path_,id_path)
	{
		//histo 1
		svg.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("height",0)
			.attr("y", height)
			.attr("id",function(d,i) {return 'rect1'+(i+100);})
			.on("mouseover", function(d,i) { 
					document.getElementById('rect1'+(i+100)).style.stroke="white";
					document.getElementById('rect2'+(i+100)).style.stroke="white";
					if(valeur_coleur_histo1=="url(#highcharts-32)")
					{
						this.setAttribute("fill", "	rgb(155,206,0)");	//	modifier la coleur du rectangle en survolant
					}
					if(valeur_coleur_histo2=="url(#highcharts-33)")
					{
						document.getElementById('rect2'+(i+100)).setAttribute("fill","rgb(255,126,40)");
					}
					div_.transition()        
						.duration(200)      
						.style("opacity", .9);      
					div_.html("CA en France pour l'année:"+d.annee + "<br/><span class='vert'>Dettes :</span>"+ d.gdp
							+ "<br/><span class='orange'>CA :</span>"+ d.chiffre_af)  
						.style("left",(d3.event.pageX + 10) + "px")     
						.style("top", (d3.event.pageY - 28) + "px");
					document.getElementById(id_path).style.visibility="visible";
					path_.attr("d","M "+(xScale(d.annee)+30)+" "+height+" L "+(xScale(d.annee)+30)+" 0");	
				})                  
			.on("mouseout", function(d,i) {       
					document.getElementById('rect1'+(i+100)).style.stroke="#FFFFFF";
					document.getElementById('rect2'+(i+100)).style.stroke="#FFFFFF";
					this.setAttribute("fill", valeur_coleur_histo1);	//	modifier la coleur du rectangle en survolant
					document.getElementById('rect2'+(i+100)).setAttribute("fill",valeur_coleur_histo2);
					div_.transition()        
						.duration(200)      
						.style("opacity", 0);
					document.getElementById(id_path).style.visibility="hidden";
				})
			.transition().duration(3008)
			.attr({
				"x":function(d){return xScale(d.annee)+8;},
				"y":function(d){return yScale(d.gdp);},
				"width":xScale.rangeBand()/3,
				"height":function(d){return height - yScale(d.gdp);}
				})
			 .attr("fill",valeur_coleur_histo1)
			;
			
		//histo 2
		svg.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("id",function(d,i) {return 'rect2'+(i+100);})
			.on("mouseover", function(d,i) { 
					document.getElementById('rect1'+(i+100)).style.stroke="white";
					document.getElementById('rect2'+(i+100)).style.stroke="white";
					if(valeur_coleur_histo2=="url(#highcharts-33)")
					{
						this.setAttribute("fill", "	rgb(255,126,40)");	//	modifier la coleur du rectangle en survolant
					}
					if(valeur_coleur_histo1=="url(#highcharts-32)")
					{
						document.getElementById('rect1'+(i+100)).setAttribute("fill","rgb(155,206,0)");
					}
					div_.transition()        
						.duration(200)      
						.style("opacity", .9);      
					div_.html("CA en France pour l'année:"+d.annee + "<br/><span class='vert'>Dettes :</span>"+ d.gdp
							+ "<br/><span class='orange'>CA :</span>"+ d.chiffre_af)  
						.style("left",(d3.event.pageX + 10) + "px")     
						.style("top", (d3.event.pageY - 28) + "px");
					document.getElementById(id_path).style.visibility="visible";
					path_.attr("d","M "+(xScale(d.annee)+30)+" "+height+" L "+(xScale(d.annee)+30)+" 0");	
				})                  
			.on("mouseout", function(d,i) {       
					document.getElementById('rect1'+(i+100)).style.stroke="#FFFFFF";
					document.getElementById('rect2'+(i+100)).style.stroke="#FFFFFF";
					this.setAttribute("fill",valeur_coleur_histo2);	//	modifier la coleur du rectangle en survolant
					document.getElementById('rect1'+(i+100)).setAttribute("fill",valeur_coleur_histo1);
					div_.transition()        
						.duration(200)      
						.style("opacity", 0);
					document.getElementById(id_path).style.visibility="hidden";
				})
			.transition().duration(3008)
			.attr({
				"x":function(d){return xScale(d.annee)+(xScale.rangeBand()/2.5)+8;},
				"y":function(d){return yScale_2(d.chiffre_af);},
				"width":xScale.rangeBand()/3,
				"height":function(d){return height - yScale_2(d.chiffre_af);}
				})
			 .attr("fill",valeur_coleur_histo2);
}
//Le titre du graphe
function  graph_title(svg,width,titre)
{
	svg.append('text')
		.text(titre)
		.attr("class","titre_graphe")
		.attr('x',width/2);
}
//Graphe sous forme des points
function draw_point(svg,data,rayon,echelle_x,echelle_y,veleur_coleur,width_conteur,coleur_conteur,valeur_id,opacity,visibility){
	svg.selectAll("dot")    
		.data(data)         
		.enter().append("circle")                               
		.attr("r", rayon) 
		.attr("id",function(d,i) { return valeur_id+i;})
		.attr("cx", function(d) { return echelle_x(d.annee)+(echelle_x.rangeBand()/2);})       
		.attr("cy", function(d) { return echelle_y(d.chiffre_af); })
		.attr("stroke", coleur_conteur)
		.attr("stroke-width", width_conteur)
		.attr("visibility",visibility)
		.attr("fill",veleur_coleur)
		.attr("style","opacity:"+opacity);
}

// pour le graphe avec zoom
function graph_zoom(){
	  var data = [];
    var bandPos = [-1, -1];
    var pos;
    var xdomain = 500;
    var ydomain = 30;
    var colors = ["steelblue", "green"];
    
    var margin = {
        top: 40,
        right: 40,
        bottom: 50,
        left: 60
    }
    var width = 760 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;
	
	var margin={top:28, right:45, bottom:100, left:40},
		ww=document.getElementById("chart2").clientWidth,
		width=ww-margin.right-margin.left,
		height=400-margin.top-margin.bottom;
    var zoomArea = {
        x1: 0,
        y1: 0,
        x2: xdomain,
        y2: ydomain
    };
    var drag = d3.behavior.drag();
    
    //data aléatoire
    var d1 = [];
    var d2 = [];
    
    for (var i = 0; i < xdomain; i++) {
        d1.push([i, Math.random() * 20 + 10]);
        d2.push([i, Math.random() * 10 + 10]);
    }
    
    data.push(d1);
    data.push(d2);
    
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    var x = d3.scale.linear()
        .range([0, width]).domain([0, xdomain]);
    
    var y = d3.scale.linear()
        .range([height, 0]).domain([0, ydomain]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
		.ticks(6);
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
		.ticks(5);
    
    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) {
        return x(d[0]);
    })
        .y(function (d) {
        return y(d[1]);
    });
    
    var band = svg.append("rect")
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "band");
    
    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")");
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    
    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);
    
    for(idx in data) {   
        svg.append("path")
            .attr("class", "line line" + idx)
            .attr("clip-path", "url(#clip)")
            .attr("d", line(data[idx]));
    }
    
    var zoomOverlay = svg.append("rect")
        .attr("width", width - 10)
        .attr("height", height)
        .attr("class", "zoomOverlay")
        .call(drag);
    
    var zoomout = svg.append("g");
    
    zoomout.append("rect")
        .attr("class", "zoomOut")
        .attr("width", 95)
        .attr("height", 40)
        .attr("x", -12)
        .attr("y", height + (margin.bottom - 20))
        .on("click", function () {
        	zoomOut();
    	});
    
    zoomout.append("text")
        .attr("class", "zoomOutText")
        .attr("width", 75)
        .attr("height", 30)
        .attr("x", -10)
        .attr("y", height + (margin.bottom - 5))
        .text("Retour Zoom");
    
    zoom();
    
    drag.on("dragend", function () {
        var pos = d3.mouse(this);
        var x1 = x.invert(bandPos[0]);
        var x2 = x.invert(pos[0]);
    
        if (x1 < x2) {
            zoomArea.x1 = x1;
            zoomArea.x2 = x2;
        } else {
            zoomArea.x1 = x2;
            zoomArea.x2 = x1;
        }
    
        var y1 = y.invert(pos[1]);
        var y2 = y.invert(bandPos[1]);
    
        if (x1 < x2) {
            zoomArea.y1 = y1;
            zoomArea.y2 = y2;
        } else {
            zoomArea.y1 = y2;
            zoomArea.y2 = y1;
        }
    
        bandPos = [-1, -1];
    
        d3.select(".band").transition()
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", bandPos[0])
            .attr("y", bandPos[1]) ;
      
        zoom();
            
    });
    
    drag.on("drag", function () {
    
        var pos = d3.mouse(this);
    
        if (pos[0] < bandPos[0]) {
            d3.select(".band").
            attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")");
        }
        if (pos[1] < bandPos[1]) {
            d3.select(".band").
            attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")");
        }
        if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {
            d3.select(".band").
            attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")");
        }
    
        //set la position
        if (bandPos[0] == -1) {
            bandPos = pos;
            d3.select(".band").attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")");
        }
    
        d3.select(".band").transition().duration(1)
            .attr("width", Math.abs(bandPos[0] - pos[0]))
            .attr("height", Math.abs(bandPos[1] - pos[1]));
    });
    
    function zoom() {
    	//recalculer domains
        if(zoomArea.x1 > zoomArea.x2) {
          x.domain([zoomArea.x2, zoomArea.x1]);
        } else {
          x.domain([zoomArea.x1, zoomArea.x2]);
        }
        
        if(zoomArea.y1 > zoomArea.y2) {
          y.domain([zoomArea.y2, zoomArea.y1]);
        } else {
          y.domain([zoomArea.y1, zoomArea.y2]);
        }
      
        //modifier les axis et redessiner lines
        var t = svg.transition().duration(750);
        t.select(".x.axis").call(xAxis);
        t.select(".y.axis").call(yAxis);
     
        for(idx in data) {
        	t.select(".line" + idx).attr("d", line(data[idx]));
            t.select(".line" + idx).style("stroke", colors[idx]);
    
        }
      
    }
    
    var zoomOut = function () {
        x.domain([0, xdomain]);
        y.domain([0, ydomain]);
    
        var t = svg.transition().duration(750);
        t.select(".x.axis").call(xAxis);
        t.select(".y.axis").call(yAxis);
        
        for(idx in data) {
        	t.select(".line" + idx).attr("d", line(data[idx]));
            t.select(".line" + idx).style("stroke", colors[idx]);
        }
    }
}
