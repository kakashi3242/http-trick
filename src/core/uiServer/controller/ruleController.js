/**
 * Created by tsxuehu on 4/11/17.
 */
import Repository from "../../repository";

export default class RuleController {
    constructor() {
        this.ruleRepository = Repository.getRuleRepository();
        this.configRepository = Repository.getConfigureRepository();
    }

    regist(router) {
        //{
        //    name:name,
        //    description:description
        //}
        router.post('/rule/create', (ctx, next) => {
            let userId = ctx.userId;
            let result = this.ruleRepository.createRuleFile(userId, ctx.request.body.name
                , ctx.request.body.description);
            this.body = {
                code: result ? 0 : 1,
                msg: result ? '' : '文件已存在'
            };
        });
        // /rule/filelist
        router.get('/rule/filelist', async (ctx, next) => {
            let userId = ctx.userId;
            let ruleFileList = await this.ruleRepository.getRuleFileList(userId);
            this.body = {
                code: 0,
                list: ruleFileList
            }
        });
        // /rule/deletefile?name=${name}
        router.get('/rule/deletefile', (ctx, next) => {
            let userId = ctx.userId;
            this.ruleRepository.deleteRuleFile(userId, ctx.query.name);
            this.body = {
                code: 0
            }
        });
        // /rule/setfilecheckstatus?name=${name}&checked=${checked?1:0}
        router.get('/rule/setfilecheckstatus', (ctx, next) => {
            let userId = ctx.userId;
            this.ruleRepository.setRuleFileCheckStatus(userId, ctx.query.name,
                ctx.query.checked == 1 ? true : false);
            this.body = {
                code: 0
            };
        });
        // /rule/getfile?name=${name}
        router.get('/rule/getfile', async (ctx, next) => {
            let userId = ctx.userId;
            let content = await this.ruleRepository.getRuleFile(userId, ctx.query.name);
            this.body = {
                code: 0,
                data: content
            };
        });
        // /rule/savefile?name=${name} ,content
        router.post('/rule/savefile', (ctx, next) => {
            let userId = ctx.userId;
            this.ruleRepository.saveRuleFile(userId, ctx.query.name, ctx.request.body);
            this.body = {
                code: 0
            };
        });

        // 导出规则文件
        // /rule/download?name=${name}
        router.get('/rule/download', async (ctx, next) => {
            let userId = ctx.userId;
            let name = this.query.name;
            let content = await this.ruleRepository.getRuleFile(userId, name);
            ctx.response.header['Content-disposition'] = `attachment;filename=${name}.json`;
            this.body = content;
        });

        // /rule/test
        router.post('/rule/test', (ctx, next) => {
            /*
             url: '',// 请求url
             match: '',// url匹配规则
             targetTpl: '',// 路径模板， 会用urlReg的匹配结果来替换targetTpl $1 $2
             matchRlt: '',// url匹配结果
             targetRlt: ''// 路径匹配结果
             */
            let userId = ctx.userId;
            let match = ctx.request.body.match;
            let url = ctx.request.body.url;
            let matchRlt = '不匹配';

            if (match && (url.indexOf(match) >= 0 || (new RegExp(match)).test(url))) {
                matchRlt = 'url匹配通过'
            }

            let targetTpl = ctx.request.body.targetTpl;
            let targetRlt = this.configRepository.calcPathbyUser(userId, url, match, targetTpl);

            // 测试规则
            this.body = {
                code: 0,
                data: {
                    matchRlt: matchRlt,
                    targetRlt: targetRlt
                }
            };
        });
    }
}