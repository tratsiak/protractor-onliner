const Page = require('./mainPage');

class ForumPage extends Page {

    newest = '//div[contains(@class, "part_1")]//span[contains(@class, "sign")]';
    header = '//h1[@class="m-title"]';
    lastPage = '//div[@class="b-hdtopic"]//li[last()-1]';
    timeOfCreation = '//a[@class="link-getlast"]';
    
    async getHeader(xpath) {
        let header = await this.getTextOfElement(await this.getElement(xpath));
        return header.match(/^[А-Яа-я\w ]+$/m)[0];
    }

    async getCountOfTopic(xpath) {
        let count = await this.getTextOfElement(await this.getElement(xpath));
        return Number.parseInt((count.match(/\(.+\)/)[0]).replace(/[а-я]*[\(\)][а-я]*/g, ''));
    }

    async getTimeofCreation(xpath) {
        let times = [];
        let results = await this.getElements(xpath);
        for (let result of results) {
            let time = await this.getTextOfElement(result);
            times.push(Number.parseInt(time.match(/\w+/)[0]));
        }
        return times; 
    }

}

module.exports = new ForumPage();