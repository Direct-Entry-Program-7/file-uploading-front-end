import $ from 'jquery';

const fr = new FileReader();

$("#txt-name").trigger('focus');

/* Event listeners */

$('#btn-browse').on('click', ()=> $('#file').trigger('click'));

$('#file').on('input', ()=> {
    const files = (document.getElementById('file') as HTMLInputElement).files;

    if (files.length > 0){
        fr.readAsDataURL(files[0]);
    }
});

fr.addEventListener('load', ()=>{
    $('#picture').attr('src', fr.result + "");
});

$('#btn-clear').on('click', ()=> {
    $('#picture').attr('src', '');
    $('#file').val('');
});