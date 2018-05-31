const cheerio = require('cheerio')
const request = require('sync-request')
const prototype = require('./prototype')

const url = 'https://{0}/sts_sci_md00_001.do?schulCode={1}&schulCrseScCode={2}&schulKndScScore=0{3}&schYm={4}{5}'
const timings = ['조식', '중식', '석식']

class SchoolAPI {
    constructor (region, schoolCode, type) {
        this.region = region
        this.schoolCode = schoolCode

        if(!type) {
            this.type = this.constructor.Type.HIGH
        }
    }

    getFormattedURL(year, month) {
        return url.format(this.region, this.schoolCode, this.type, this.type, year, month.pad())
    }

    getMonthlyMenus(year, month) {
        let menus;
        let resp = request('GET', this.getFormattedURL(year, month))

        let $ = cheerio.load(resp.getBody('utf-8'));
        return this.getMenusFromCheerio($);
    }

    getMenusFromCheerio($) {
        let menus = {}

        $('.tbl_type3.tbl_calendar td').filter((i, cell) => $(cell).text() !== ' ').each((i, cell) => {
            let menu = this.getMenuFromData($(cell).text())

            menus[i+1] = {
                'breakfast': menu[0], 'lunch': menu[1], 'dinner': menu[2]
            }
        })

        return menus
    }

    getMenuFromData(data) {
        let menu = {}
        let timing = -1

        let matches = data.match(/[가-힣]+\([가-힣]+\)|[가-힣]+/g);

        if (matches) {
            matches.forEach(text => {
                if (text.match(/[조중석]식/)) {
                    timing = timings.indexOf(text)
                    menu[timing] = []
                } else {
                    menu[timing].push(text)
                }
            })
        }

        return menu
    }
}

SchoolAPI.Region = {
    SEOUL: 'stu.sen.go.kr',
    BUSAN: 'stu.pen.go.kr',
    DAEGU: 'stu.dge.go.kr',
    INCHEON: 'stu.ice.go.kr',
    GWANGJU: 'stu.gen.go.kr',
    DAEJEON: 'stu.dje.go.kr',
    ULSAN: 'stu.use.go.kr',
    SEJONG: 'stu.sje.go.kr',
    GYEONGGI: 'stu.cbe.go.kr',
    KANGWON: 'stu.kwe.go.kr',
    CHUNGBUK: 'stu.cbe.go.kr',
    CHUNGNAM: 'stu.cne.go.kr',
    JEONBUK: 'stu.jbe.go.kr',
    JEONNAM: 'stu.jne.go.kr',
    GYEONGBUK: 'stu.gbe.go.kr',
    GYEONGNAM: 'stu.gne.go.kr',
    JEJU: 'stu.jje.go.kr'
}

SchoolAPI.Type = {
    KINDERGARTEN: 1,
    ELEMENTARY: 2,
    MIDDLE: 3,
    HIGH: 4
}

module.exports = SchoolAPI