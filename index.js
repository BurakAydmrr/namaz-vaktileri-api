const axios = require('axios').default
const express = require('express')
const cheerio = require('cheerio')
var html = `<table class="table">
<thead>
  <tr>
    <th scope="col">*</th>
    <th scope="col">Sehir adi</th>
    <th scope="col">Iftar vakti</th>
    <th scope="col">Yatsi vakti</th>
  </tr>
</thead>
<tbody>
`

const app = express()

var veriler = ""
app.get('/', (req, res) => {

  
    axios.get('https://www.haberturk.com/namaz-vakitleri').then(response => {
        const $ = cheerio.load(response.data)
        const iftarvakitleri = []

        $('#imsakiye-table > tbody').each(function () {

            $(this).find('tr').each(function () {
                const iftarvakti = {
                    sehir: $(this).find('td:nth-child(1)').text(),
                    imsak: $(this).find('td:nth-child(2)').text(),
                    gunes: $(this).find('td:nth-child(3)').text(),
                    ogle: $(this).find('td:nth-child(4)').text(),
                    ikindi: $(this).find('td:nth-child(5)').text(),
                    aksam: $(this).find('td:nth-child(6)').text(),
                    yatsi: $(this).find('td:nth-child(7)').text()
                }

                veriler+=`
                <tr>
                  <th scope="row">#</th>
                  <td>${$(this).find('td:nth-child(1)').text()}</td>
                  <td>${$(this).find('td:nth-child(6)').text()}</td>
                  <td>${$(this).find('td:nth-child(7)').text()}</td>
                </tr>
                `
               
                
            })
            res.send(html+veriler+`</tbody></table>`)
            //iftarvakitleri.push(iftarvakti)

        })

        res.json(iftarvakitleri)
    })



    }
)


    

app.listen(3000, () => {
    console.log('listening on port 3000')
})