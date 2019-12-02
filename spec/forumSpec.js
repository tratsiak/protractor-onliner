const ForumPage = require('../pages/forumPage');
const MainPage = new (require('../pages/mainPage'))();
const data = require('../data');

describe('Onliner forum page', () => {
    it('tab title should be "Форум onliner.by - Главная страница"', async () => {
        await MainPage.open('');
        await MainPage.mainNavigateTo(MainPage.mainNavigate, 'Форум');
        expect(ForumPage.getTitle()).toBe('Форум onliner.by - Главная страница');
    });

    it('header should be "Новое за 24 часа"', async () => {
        await ForumPage.clickOn(ForumPage.newest);
        expect(ForumPage.getHeader(ForumPage.header)).toBe('Новое за 24 часа');
    });

    it(`the number of topics should be ${data.countOfTopic} or more`, async () => {
        expect(ForumPage.getCountOfTopic(ForumPage.header)).toBeGreaterThanOrEqual(data.countOfTopic);
    });

    it(`topic creation time should be less than 24 hours ago`, async () => {
        await ForumPage.clickOn(ForumPage.lastPage);
        let times = await ForumPage.getTimeofCreation(ForumPage.timeOfCreation);
        for (let time of times) {
            expect(time).toBeLessThanOrEqual(23);
        }
    });
});