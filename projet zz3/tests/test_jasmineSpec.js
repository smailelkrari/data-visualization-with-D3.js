describe('Demo test D3.js ', function() {
  var c;

  beforeEach(function(done) {
    var testData =  [{ date: '2014-01', value: 100}, { date: '2014-02', value: 140}, {date: '2014-03', value: 215}];
    c = barChart();
    c.setData(testData);
    c.render();
    //timer Jasmien 2.0.0
    //Appeler la fonction done dans tout test ayant besoin d'un temps d'attente
    setTimeout(function() {
            value = 0;
            done();
        }, 200);
  });

  afterEach(function() {
    d3.selectAll('svg').remove();
  });

  describe('Le svg' ,function() {
    it('devrait etre cree', function() {
        expect(getSvg()).not.toBeNull();
    });

    it('devrait avoir la bonne hauteur', function() {
      expect(getSvg().attr('width')).toBe('500');
    });

   
  });
  describe('tests des données' ,function() {
    it('données null', function() {
      c.setData(null);
        expect(c.getData()).toBeNull();
    });

    it('changement des données', function() {
      var testData =  [{ date: '2014-01', value: 100}, {date: '2014-02', value: 215}];
      c.setData(testData);
      expect(c.getData()).toBe(testData);
    });
  });

  describe('creation des barres' ,function() {
    it('le bon nombre de barres', function(done) { 
            expect(getBars().length).toBe(3);
            done();
        
    });

    it('la bonne hauteur', function(done) {   
            
            expect(d3.select(getBars()[0]).attr('height')).toBeGreaterThan(195);
            done();
      });

    it('le bon abscisse', function() {
    
        expect(d3.select(getBars()[0]).attr('x')).toBeCloseTo(9);
    });

    it('le bon ordonnée', function(done) {
     
        expect(d3.select(getBars()[0]).attr('y')).toBeGreaterThan(224);
        done();
    });
  });

  describe('creation des axes', function() {
    it('creation de :axe x', function() {
         var axis = getXAxis();
         expect(axis.length).toBe(1);
    });

    it('creation de :axe y', function() {
       var axis = getYAxis();
       expect(axis.length).toBe(1);
    });



});


function getXAxis() {
    return d3.selectAll('g.x_axis')[0];
}

function getYAxis() {
    return d3.selectAll('g.y_axis')[0];
}

  function getSvg() {
    return d3.select('svg');
  }
  function getBars() {
    
    return d3.selectAll('rect.bar')[0];
}
//timer fonctionnant sous Jasmine 1.2.4
function waitForElement(fn, time) {
    time = time || 1000;
    waits(time);
    runs(fn);
}

});