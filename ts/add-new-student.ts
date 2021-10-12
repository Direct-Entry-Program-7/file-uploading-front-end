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
    $('#picture').attr('src', ' ');
    $('#file').val('');
});

$("#btn-save").on('click', (eventData)=> {

    eventData.preventDefault();
    
    const name = ($("#txt-name").val() as string).trim();
    const address = ($("#txt-address").val() as string).trim();
    const contact = ($("#txt-contact").val() as string).trim();

    if (!/^[A-Za-z ]+$/.test(name)){
        alert("Invalid name");
        $("#txt-name").trigger('select');
        return;
    }else if(address.length < 3){
        alert("Invalid address");
        $("#txt-address").trigger('select');
        return;
    }else if(contact && !/[0-9 ]{7,}/.test(contact)){
        alert("Invalid contact");
        $("#txt-contact").trigger('select');
        return;
    }

    /* Client-side validation is okay */

});