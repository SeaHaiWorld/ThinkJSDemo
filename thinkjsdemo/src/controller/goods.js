const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    console.log(this.ctx.post());
    const currentPage = this.ctx.post('currentPage') || 1;
    const pageSize = this.ctx.post('pageSize') || 10;
    console.log(currentPage);
    console.log(pageSize);
    const model = this.model('goods');
    const goodsList = await model.page(currentPage, pageSize).countSelect();
    return this.success(goodsList);
  }

  async idAction() {
    console.log(this.ctx.post());
    const search = this.ctx.post('search');
    console.log(this.ctx.post('search'));
    const model = this.model('goods');
    const goodsList = await model.where({'id|name': ['like', `%${search}%`]}).countSelect();
    console.log(goodsList);
    return this.success(goodsList);
  }
};
