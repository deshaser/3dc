(function($) {

    Sidebar = {

        wrap : $('#sidebar ul'),
        
        details : {
           'interceptor' : {
            src: 'interceptor',
            position: {
              y: 40,
              z: 80
            }
          },
          'kosynka_na_tranec' : {
            src: 'kosynka_na_tranec',
            position: {
              y: 40
            }
          },
          'liktros' : {
            src: 'liktros',
            position: {
              y: 40,
              z: 120
            }
          },
          'mixer' : {
            src: 'mixer',
            position: {
              y: 40,
              x: 150,
              z: -100
            }
          },
          'org_snastey' : {
            src: 'org_snastey',
            position: {
              y: 40,
              x: 20,
              z: -100
            }
          },
          'ruchka' : {
            src: 'ruchka',
            position: {
              y: 40,
              z: -30
            }
          },
          'rul_kol_metl' : {
            src: 'rul_kol_metl',
            position: {
              y: 40,
              x: 40,
              z: 20
            }
          },
          'rul_kol_plast' : {
            src: 'rul_kol_plast',
            position: {
              y: 40,
              x: -40,
              z: 20
            }
          },
          'strahov_kol' : {
            src: 'strahov_kol',
            position: {
              y: 40,
              z: -40
            }
          },
          'ukb' : {
            src: 'ukb',
            position: {
              y: 40,
              x: 40,
              z: -40
            }
          },
          'usil_tranec' : {
            src: 'usil_tranec',
            position: {
              y: 40,
              x: -40,
              z: -40
            }
          },
          'verevochka' : {
            src: 'verevochka',
            position: {
              y: 40,
              x: -40,
              z: -90
            }
          },
          'veslo' : {
            src: 'veslo',
            position: {
              y: 40,
              x: -20,
              z: -40
            }
          },
          'yakorny_rym' : {
            src: 'yakorny_rym',
            position: {
              y: 40,
              x: 20,
              z: -40
            }
          },
          'tent' : {
            src: 'tent',
            position: {
              y: 40,
              x: -180
            }
          }
        },		

        load : function (item){
            if(!item.object){
                try{
                    OBJMTLLoader.load('src/details/' + item.src + '.obj', 'src/details/' + item.src + '.mtl', function (object) { //OBJMTLLoader inited in main.js
                         object.position.x = item.position.x || 0;
                         object.position.y = item.position.y || 0;
                         object.position.z = item.position.z || 0;
                         item.object = object;
                         scene.add(object); //scene inited in main.js
                       });
                }catch(e){console.log(e)};
            }
            else{
                item.object.visible = true;
            }
        },

        build : function(){
            for(item in this.details)
            {
                if(this.details.hasOwnProperty(item))
                {
                    var el = this.details[item];
                    var type = el.type || 'checkbox';
                    el.node = $('<li><input class="'+ el.src +'" data-el="'+ el.src +'" type="'+ type +'">'+el.src+'</li>').appendTo(this.wrap);
                }
            }
            
            console.log('build');
        },
        
        init: function(){
            var self = this;
            console.log('init');
            self.build();
            $('#sidebar input').on('change',function(){
                if ($(this).is(':checked')){
                    self.load(self.details[$(this).data('el')]);
                }
                else{
                    if(self.details[$(this).data('el')].object){
                        self.details[$(this).data('el')].object.visible = false;
                    }
                    else{
                        console.log('smth went wrong');
                    }
                }
            })
            
        }
    }
	






  // $(document).ready(function() {

    // $('#sidebar').bind('click', function(e) {
      // if(e.target.localName === 'input') {
        // $('body').trigger( "custom", [ $(e.target).prop('checked'), "Event" ] );
      // }
      // if(e.target.localName === 'li') {
        // var li = e.target;
       // console.log(e.target)
        // if(li.hasClass('checkbox')) {
          // if(li.hasClass('show')) {
            // li.addClass('hide')
          // } else {
            // li.addClass('show')
          // }
        // } else if(li.hasClass('radio')) {

        // } else {
          // $('body').trigger( "custom", [ $(e.target).prop('checked'), "Event" ] );
        // }
      // }
    // });

  // });

}(jQuery));