import { View,Text} from "@tarojs/components";
import './index.less';

const Notice = ()=>{

    return(
        <>
            <View className='title'>树洞救援AI管理系统试用通知</View>
            <View className='body'>
            <Text className='paragraph'>
            1.新成员进入系统填写报名表后耐心等待管理人员审核，审核结果会收到微信通知。
            审核通过后成为岗前培训成员 培训结束后可在个人中心查看自己的岗前培训成绩。
            {'\n'}
            {'\n'}
            2.见习队员及以上队员可参与救援活动。队员在首页可查看最新的救援报警信息，并选择最多六个不同的救援对象进行认领，每个救援对象最多有三名队员认领，且必须有至少一个队员为核心队员及以上身份。认领成功后该救援对象的后续报警信息都会在最上方置顶显示，也可在个人中心-我的救援中任务 查看所有已认领救援对象信息。
            {'\n'}
            {'\n'}
            3.每次救援报警经救援后需在报警信息详情页提交救援效果评价及记录单次救援时长；提交后该条报警不会再出现在首页推送当中，默认为单次救援已结束，但仍可在我的救援中任务中找到对应救援中对象进行查看。
            {'\n'}
            {'\n'}
            4.针对每个救援对象的结案需要全部救援人员进行电子签名，完成后自动结案。结案后的救援对象及其报警信息可在个人中心-救援记录中查看。
            {'\n'}
            {'\n'}
            5.救援详情页的救援灯说明：共三盏救援灯，红色为核心队员及以上身份，橙色为见习队员或普通队员身份，灰色表示还未有队员认领。
            {'\n'}
            {'\n'}
            6.管理人员可在个人中心进行一系列管理及审核操作。 
            {'\n'}
            {'\n'}
            (1)“岗前培训成绩录入”可进行岗前培训队员的客观题和主观题成绩的录入。注意：两种成绩要一起录入。选择通过或不通过即可, 两种成绩都通过的才可以成为见习队员。
            {'\n'}
            
            (2)“管理”可查看全部队员身份，并对队员身份进行更改。<Text style={{fontWeight: 500}}>注意：只有组委会成员才有权限操作。</Text>
            {'\n'}
            (3)“审批”可对申请队员的申请表进行审批。区域负责人可先进行地区的选择后开始审批。<Text style={{fontWeight: 500}}>注意：只有区域负责人审批通过后的报名表才能被组委会成员查看到。</Text>
            {'\n'}
            (4)“救援信息导入”可选择微信聊天记录中的文件上传并导入到系统内。<Text style={{fontWeight: 500}}>注意：只能上传excel表格文件，且按照以下特定格式进行填充。</Text>
            {'\n'}
            </Text>
            <View className='table'>
                <View className='tr'>
                    <View className='th'>发布时间</View>
                    <View className='th'>微博地址</View>
                    <View className='th'>昵称</View>
                    <View className='th'>危险级别</View>
                    <View className='th'>所在城市</View>
                    <View className='th'>性别（0-男 1-女）</View>
                    <View className='th'>生日</View>
                    <View className='th'>简介</View>
                    <View className='th'>信息原文</View>
                </View>
                <View className='tr'>
                    <View className='td'>2023-08-02 10:32</View>
                    <View className='td'>https://weibo.com/2323123923</View>
                    <View className='td' >香格里拉的花园                </View>
                    <View className='td' >5级                          </View>
                    <View className='td' >湖南                        </View>
                    <View className='td' >0                        </View>
                    <View className='td' >2003-08-30                 </View>
                    <View className='td' >很嗲手擦啊                     </View>
                    <View className='td'>来了, 终于还是来了, 我不想面对</View>
                </View>

            </View>
            <View className='people'>
                <Text className='title'>管理人员层级名单</Text>
                <Text className='paragraph'>
                    <Text style={{fontWeight: 500}}>审核级(最高级):</Text>
                    {'\n'}
                    黄智生、李虹、王学明、廖乐光
                    {'\n'}
                    <Text style={{fontWeight: 500}}>救援管理级(二级):</Text>
                    {'\n'}
                    黄智生、李虹、王学明、石阶瑶、蒲昭谦、蒋兴鹏、廖 乐光、王新丽
                    {'\n'}
                    <Text style={{fontWeight: 500}}>区域审核管理人员(14 个区域):</Text>
                    {'\n'}
                    北京区域:	李虹、郭立松
                    {'\n'}
                    上海区域:周子涵、李非洲
                    {'\n'}
                    粤桂区域:王学明(代)
                    {'\n'}
                    闽赣区域:勾小燕
                    {'\n'}
                    云贵区域:王以松
                    {'\n'}
                    川渝区域:王学明、杨科、郭梅
                    {'\n'}
                    鄂湘区域:蒋兴鹏、顾进广、钟雪梅
                    {'\n'}
                    浙江区域:冯建军、邵  明
                    {'\n'}
                    苏皖区域:石阶瑶、张志立
                    {'\n'}
                    山东区域:王新丽
                    {'\n'}
                    津冀区域:郭雨桦、郭英良
                    {'\n'}
                    河南区域:姜 杉、郭锦华
                    {'\n'}
                    西北区域(西藏、新疆，甘肃、青海、宁夏、陕西、山西):刘宏伟、董  琳
                    {'\n'}
                    东北区域(内蒙、黑龙江、辽宁、吉林) :刘启智
                    {'\n'}

                </Text>
            </View>
            </View>
        </>
    )
}

export default Notice;