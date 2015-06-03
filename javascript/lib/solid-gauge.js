/*
  Highcharts JS v4.1.5 (2015-04-13)
 Solid angular gauge module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){
    var q=b.getOptions().plotOptions,r=b.pInt,s=b.pick,j=b.each,k;q.solidgauge=b.merge(q.gauge,{colorByPoint:!0});
    k={initDataClasses:function(a){
        var c=this,
            e=this.chart,
            d,
            o=0,
            f=this.options;
        this.dataClasses=d=[];
        j(a.dataClasses,function(g,h){
            var p,g=b.merge(g);
            d.push(g);
            if(!g.color)f.dataClassColor==="category"?(p=e.options.colors,g.color=p[o++],
            o===p.length&&(o=0)):g.color=c.tweenColors(b.Color(f.minColor),
                b.Color(f.maxColor),
                h/(a.dataClasses.length-1))})},
        initStops: function(a){
            this.stops= a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
            j(this.stops,function(a){
                a.color=b.Color(a[1])})},toColor:function(a,c){
                    var e,d=this.stops,b,f=this.dataClasses,g,h;
                    if(f)for(h=f.length;h--;){if(g=f[h],b=g.from,d=g.to,(b===void 0||a>=b)&&(d===void 0||a<=d)){e=g.color;if(c)c.dataClass=h;break}}
                    else{this.isLog&&(a=this.val2lin(a));e=1-(this.max-a)/(this.max-this.min);for(h=d.length;h--;)if(e>d[h][0])break;b=d[h]||d[h+1];d=d[h+1]||b;e=1-(d[0]-e)/(d[0]-b[0]||1);e=this.tweenColors(b.color,
d.color,e)}return e},tweenColors:function(a,c,b){var d;!c.rgba.length||!a.rgba.length?a=c.raw||"none":(a=a.rgba,c=c.rgba,d=c[3]!==1||a[3]!==1,a=(d?"rgba(":"rgb(")+Math.round(c[0]+(a[0]-c[0])*(1-b))+","+Math.round(c[1]+(a[1]-c[1])*(1-b))+","+Math.round(c[2]+(a[2]-c[2])*(1-b))+(d?","+(c[3]+(a[3]-c[3])*(1-b)):"")+")");return a}};j(["fill","stroke"],function(a){HighchartsAdapter.addAnimSetter(a,function(c){c.elem.attr(a,k.tweenColors(b.Color(c.start),b.Color(c.end),c.pos))})});b.seriesTypes.solidgauge=
b.extendClass(b.seriesTypes.gauge,{type:"solidgauge",bindAxes:function(){var a;b.seriesTypes.gauge.prototype.bindAxes.call(this);a=this.yAxis;b.extend(a,k);a.options.dataClasses&&a.initDataClasses(a.options);a.initStops(a.options)},drawPoints:function(){var a=this,c=a.yAxis,e=c.center,d=a.options,o=a.chart.renderer,f=d.overshoot,g=f&&typeof f==="number"?f/180*Math.PI:0;b.each(a.points,function(b){var f=b.graphic,i=c.startAngleRad+c.translate(b.y,null,null,null,!0),j=r(s(b.options.radius,d.radius,
100))*e[2]/200,l=r(s(b.options.innerRadius,d.innerRadius,60))*e[2]/200,m=c.toColor(b.y,b);m==="none"&&(m=b.color||a.color||"none");if(m!=="none")b.color=m;i=Math.max(c.startAngleRad-g,Math.min(c.endAngleRad+g,i));d.wrap===!1&&(i=Math.max(c.startAngleRad,Math.min(c.endAngleRad,i)));var i=i*180/Math.PI,n=i/(180/Math.PI),k=c.startAngleRad,i=Math.min(n,k),n=Math.max(n,k);n-i>2*Math.PI&&(n=i+2*Math.PI);b.shapeArgs=l={x:e[0],y:e[1],r:j,innerR:l,start:i,end:n,fill:m};b.startR=j;f?(b=l.d,f.animate(l),l.d=
b):b.graphic=o.arc(l).attr({stroke:d.borderColor||"none","stroke-width":d.borderWidth||0,fill:m,"sweep-flag":0}).add(a.group)})},animate:function(a){if(!a)this.startAngleRad=this.yAxis.startAngleRad,b.seriesTypes.pie.prototype.animate.call(this,a)}})})(Highcharts);