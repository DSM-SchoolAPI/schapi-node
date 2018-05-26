String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

url = 'https://{0}/sts_sci_md00_001.do?schulCode={1}&schulCrseScCode={2}&schulKndScScore=0{3}&schYm={4}{5}'

class SchoolAPI {
    constructor (region, schoolCode, type) {
        this.region = region
        this.schoolCode = schoolCode

        if(!type) {
            this.type = this.constructor.Type.HIGH
        }
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