import $ from 'jquery';
import { Student } from './dto/student-dto';

const BASE_API = 'http://localhost:8080/sms/students';

$("#txt-search").trigger('focus');
loadStudents();

/* Event listeners */

$("#txt-search").on('input', ()=> loadStudents());

/* API Calls */

function loadStudents(): void {

    const q = ($("#txt-search").val() as string).trim();

    fetch(BASE_API + `?q=${q}`).then((response) => {

        if (response.status !== 200) throw new Error("Failed to fetch students");

        response.json().then((students:Array<Student>) => {

            $("ul.result li").remove();

            students.forEach(s => {

                const html = `
                    <li class="result__result-item">
                    <div class="result__pic">
                        <img alt="" src="${s.picture??''}"">
                    </div>
                    <div class="result__id-container">
                        <span class="result__id">${s.id}</span>;
                        <span class="result__name">${s.name}</span>
                    </div>
                    <div class="result__contact">${s.contact??''}</div>
                    <div class="result__address">${s.address}</div>
                    </li>                
                `;

                $("ul.result").append(html);

            });

        });

    })

}

