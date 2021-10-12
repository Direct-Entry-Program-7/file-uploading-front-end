import $ from 'jquery';

const fr = new FileReader();
const BASE_API = 'http://localhost:8080/sms/students';

$("#txt-name").trigger('focus');

/* Event listeners */

$('#btn-browse').on('click', ()=> $('#file').trigger('click'));

$('#file').on('input', ()=> {
    const files = (document.getElementById('file') as HTMLInputElement).files!;

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

    const files = (document.getElementById('file') as HTMLInputElement).files!;

    /* Client-side validation is okay */
    saveStudent(name, address, contact ?? null, files.length === 0 ? null : files[0])
    .then((id) => {
        alert(`${id} has been saved successfully`);
        (document.getElementById('frm') as HTMLFormElement).reset();
        $("#txt-name").trigger('focus');
        $("#picture").attr('src', ' ');
    }).catch((err) => {
        alert(err.message);
        console.log(err);
    })

});

/* API Calls */

function saveStudent(name: string, address: string, contact: string | null = null, picture: File | null = null): Promise<string> {

    return new Promise<string>((res, rej) => {

        const studentData = new FormData();
        
        studentData.append('name', name);
        studentData.append('address', address);

        if (contact){
            studentData.append('contact', contact);
        }

        if (picture){
            studentData.append('picture', picture);
        }

        fetch(BASE_API, {
            method: 'POST',
            body: studentData
        }).then((response) => {

            if (response.status !== 201) throw new Error('Failed to save the customer');

            response.json().then((json) => res(json));

        }).catch((err) => {

            rej(err);

        });

    });

}