// Image Loader 1.1
// author: AlexStep

var LoadedText = function() {
    return (
        <div className="loadBoxHeader">
            <b className="text-primary">Загруженные файлы</b>
        </div>
    )
};

var CloseCross = React.createClass(
    {
        imgPrevDelete : function (e) {
            this.model = $('.imgBox').attr('data-model');
            $.ajax({
                url: '/' + this.model + '/image-delete/?name='+ $(e.target).parents('.loadedImg').find('img').attr('data-src'),
                type: 'POST',
                dataType: 'json',
                success : function( data, status ) { success(data); },
                error : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; console.log(errorMessage); }
            });
        },
        render: function() {
            return (
                <i onClick={this.imgPrevDelete} title="Удалить файл" className="fa fa-times loadedImgDel pointer" data-model={this.model}></i>
            );
        }
    }
);



var PreviewImg = React.createClass(
    {
        render: function() {
            return (
                <div className="imgBoxInner">
                    <LoadedText />
                    <div className="loadedImgInnr">
                        {
                            this.props.data.render.map( function(arrElem) {
                                return (
                                    <div className="loadedImg">
                                        <CloseCross />
                                        <a href={arrElem['src']}  download>
                                            <img data-src={arrElem['dataSrc']} src={arrElem['src']} title={arrElem['title']} className="img-thumbnail pointer" />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
);

$( function () {

    // choice file
    $('.btnLoad').each( function() {
        var btn = $(this);
        btn.on('click',function() {
            btn.parents('.loadBox').find('.hiddenInp').trigger('click');
        });
    } );

    // preview
    $('.hiddenInp').each( function () {
        var inp = $(this);
        inp.on('change', function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onload = function(e) {
                    inp.parents('.loadBox').find('.loadThumb').attr('src', e.target.result);
                }
            }
        });
    } );

    // discard
    $('.loadDiscard').each( function () {
        var btn = $(this);
        btn.on('click', function () {
            btn.parents('.loadBox').find('.loadThumb').attr('src', '/images/tmp/noimg2.png');
            btn.parents('.loadBox').find('.loadDescr').val('');
            btn.parents('.loadBox').find('.hiddenInp').val('');
        });
    } );

    // load
    $('.loadOn').each( function () {
        var btn = $(this);
        btn.on('click', function () {
            var inp = $('.hiddenInp').get(0);
            if ( inp.files && inp.files[0] ) {
                var Data = new FormData();
                var Model = btn.attr("data-model");
                var field = Model + '[image]';
                var base = Model.toLowerCase();
                Data.append( field, $('.hiddenInp').get(0).files[0], $('.hiddenInp').val() );
                Data.append('description', $('.loadDescr').val() );

                btn.parents('.loadBox').find('.lb-spin').show('fade', null, 200, function () {
                    $.ajax({
                        url: '/' + base + '/upload-image/?id=' + btn.attr("data-item"),
                        type: 'POST',
                        cache: false,
                        dataType: 'json',
                        data: Data,
                        processData: false,
                        contentType: false,
                        success : function( data, status ) { success(data, btn, 'load'); },
                        error : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; console.log(errorMessage); },
                        complete: function () {
                            btn.parents('.loadBox').find('.lb-spin').hide('fade', null, 200);
                        }
                    });
                });

            }
            else {
                console.log('no file');
                return false;
            }
        });
    });

    // del
    $('.loadedImgDel').each( function () {
        $(this).on('click', function(){
            var model = $('.imgBox').attr('data-model');
            $.ajax({
                url: '/' + model + '/image-delete/?name='+ $(this).parents('.loadedImg').find('img').attr('data-src'),
                type: 'POST',
                dataType: 'json',
                success : function( data, status ) { success(data); },
                error : function (xhr, errorType, exception) { var errorMessage = exception || xhr.statusText; console.log(errorMessage); }
            });
        } );
    } );
} );

// gen
function success(Data, elem, type) {
    if(elem && type === 'load') {
        elem.parents('form').trigger('reset');
        elem.parents('.loadBox').find('.loadThumb').attr('src', '/images/tmp/noimg2.png');
    }
    ReactDOM.render(<PreviewImg data={Data} />, document.getElementsByClassName('imgBox')[0]);
    $('.img-thumbnail').tooltip();
}


// -----------------------------------------------


// Notifications 1.0
// author: AlexStep

let source = [
    {
        uid: 1,
        title: 'Новое предложение',
        data: {
            text: 'Message 1',
            command: 'bid'
        },
        timestamp: Date.now(),
        duration: 3600,
        type: 'notice'
    },
    {
        uid: 2,
        title: 'Изменил предложение:',
        data: {
            text: 'Message 2',
            command: 'bid-changed'
        },
        timestamp: Date.now(),
        duration: 3600,
        type: 'warning'
    },
    {
        uid: 3,
        title: 'Подтвердился автомобилем:',
        data: {
            text: 'Message 3',
            command: 'bid-confirmed'
        },
        timestamp: Date.now(),
        duration: 3600,
        type: 'error'
    },
];


const PreviewNf = React.createClass(
    {
        render: function() {
            return (
                <li>
                    <ol>
                        {
                            this.props.data.map( function(arrElem) {

                                return (
                                    <li className="pointer">

                                                <p>{new Date( arrElem['timestamp'] ).getHours()+':'+new Date( arrElem['timestamp'] ).getMinutes()+':'+new Date( arrElem['timestamp'] ).getSeconds()}<br />{arrElem['title']}<br />{arrElem['data']['text']}</p>

                                    </li>
                                )
                            })
                        }
                    </ol>
                </li>
            )
        }
    }
);

window.msgHandler = new Object({
    msgArr: null,
    nfCount: $('#notify-count'),
    pullBtn: document.getElementById('pullmsgs'),
    rendBtn: document.getElementById('rendmsgs'),
    testBtns: function () {
        if( this.pullBtn && this.rendBtn) {
            console.log('buttons exists :)');
            return true;
        } else {
            console.log('buttons is not exists or one of them :(');
            return false;
        }
    },
    pull: function() {
        this.msgArr = source;
        if( Array.isArray(this.msgArr) && this.msgArr.length > 0 ) {
            console.log('data was received');


            ReactDOM.render(<PreviewNf data={this.msgArr} />, document.getElementById('notify-block'));


            this.rendBtn.onclick = function () {
                msgHandler.render(msgHandler.msgArr);
            };
            this.nfCount.text( this.msgArr.length ).animate(
                {
                    'opacity': '.5',
                },
                175,
                function () {
                    msgHandler.nfCount.animate({
                        'opacity': '1'
                    })
                }
            );
        } else {
            console.log('error on data receiving');
        }
    },
    init: function () {
        // -----------------------------

        // $('#servpullmsgs').on('click', function () {

        $('.nf-button').each( function () {
            $(this).on('click', function(e) {
                e.stopPropagation();
                let elem = $(this);
                let Data = new FormData();
                Data.append('id', elem.parents('.item-row').attr('data-tdr-id'));
                $.ajax({
                    method: 'POST',
                    url: `/api/notify/`,
                    dataType: 'json',
                    data: Data,
                    processData: false,
                    contentType: false,
                    success : function( data ) {
                        notificationHandler(data, elem);
                    },
                    error : function (xhr, errorType, exception) { let errorMessage = exception || xhr.statusText; console.log(errorMessage); }
                });

            });
        } );

        let notificationHandler = (s_ans, elem) => {
            if( s_ans && s_ans.hasOwnProperty('status') ) {
                classStsatusToggle(elem, s_ans.status);
            } else {
                console.log('no answer from server');
            }
            console.log(s_ans);
        };

        // universal for future
        let classStsatusToggle = (elem, currentStatus) => {
            switch(currentStatus) {
                case true : elem.removeClass('false').addClass('true'); break;
                case false : elem.removeClass('true').addClass('false'); break;
                default: return false;
            }
        };

        // -----------------------------
        if( this.pullBtn ) {
            this.pullBtn.onclick = function () {
                msgHandler.pull();
            };
            console.log('msgHandler has been initialized');
        } else {
            console.log('has no buttons on a page, module is not initialized');
        }

    },
    render: function(arr) {
        let mtime = this.timeConverter(arr.timestamp);
        arr.forEach( function (item) {
            switch (item.data.command) {
                case 'bid':
                    $.growl[item.type]({
                        title: 'новое предложение:',
                        message: mtime + ' ' + item.data.text,
                        duration: item.duration
                    });
                    break;

                case 'bid-changed':
                    $.growl[item.type]({
                        title: 'Изменил предложение:',
                        message: mtime + ' ' + item.data.text,
                        duration: item.duration
                    });
                    break;

                case 'bid-confirmed':
                    $.growl[item.type]({
                        title: 'Подтвердился автомобилем:',
                        message: mtime + ' ' + item.data.text,
                        duration: item.duration
                    });
                    break;
            }
        } );
    },
    timeConverter: function() {
        let a = new Date(Date.now() * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }
});

$( function () {
    msgHandler.init();
} );












