import Taro from '@tarojs/taro'
import { View, Button, ScrollView } from "@tarojs/components"
import { useState, useEffect } from "react"
import Fetch from '../../../Service/fetch'
import SearchBar from "../../../Components/searchbar"
import './index.less'
import './index.scss'

const Submit = () => {
    const [query, setQuery] = useState()
    const [result, setresult] = useState()
    const handleChange = (e) => {
        setQuery(e)
        !e && setresult(undefined)
    }
    const fetchnew = (que) => {
        Fetch('/user/trainging',{
            page:1,
            page_size:10,
            mobile:que
        },'post').then(res=>{
            setresult([res.data.user_info])
            if(!res.data) {
                setresult(null)
                Taro.showToast({title:'岗前培训成员不包含该用户或成绩已录入！',icon:'none'})
            }
        })
    }
    const handleSubmit = () => {
        fetchnew(query)
    }
    return (
        <>
        <SearchBar
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          query={query}
        ></SearchBar>
        <SearchScore result={result} handle={fetchnew} query={query}></SearchScore>
        </>
    )
}

export default Submit;

export const SearchScore = ({result, handle, query}) => {
    const [form, setform] = useState(result)
    const [hoverShow, sethoverShow] = useState()
    const [page, setpage] = useState(1)
    const [post, setpost] = useState(0)
    const handleClick = (arg) => {
        sethoverShow(!hoverShow)
        setpost(arg)
        if(result) {
            handle(query)
        } else {
            appendData(0)
        }
         setpage(1)
        console.log(arg);
    }
    const appendData = (flag, pagecur) => {
        Fetch('/user/role',{
            page: pagecur?pagecur:1,
            page_size: 10,
            role: 2
        },'post')
        .then(res=>{
            if(res.data.list)
                if(flag)
                    setform(prevData => [...prevData, ...res.data.list]);
                else
                    setform(res.data.list)
            else {
                Taro.showToast({
                    title:'没有更多了哦',
                    icon:'none'
                })
            }
        }).catch(err=>{
            Taro.showToast({
                title:'网络状况不佳',
                icon:'none'
            })
        })
    }
    const handleScroll = () => {
        setpage(page + 1);
        appendData(1,page + 1)
    }
    useEffect(() => {
        if(typeof result != 'undefined') {
            setform(result)
        } else {
            appendData(0)
        }
    }, [result])
    return (
        <>
        {hoverShow && <ModalHover
          handleClick={handleClick}
          post_id={post}
        ></ModalHover>}
        <ScrollView scrollY  className='submit-column' onScrollToLower={handleScroll} style={{height:'80vh'}}>
            {form && form[0] ? form?.map(item=>
                <SearchItem
                  key='search'
                  handlClick={handleClick}
                  item={item}
                ></SearchItem>): (
                    <View style={{textAlign:'center'}}>暂无该用户或已经提交过成绩</View>
            )}
        </ScrollView>
        </>
    )
}

export const ModalHover= ({handleClick,post_id}) => {
    const [Objvalue, setObjValue] = useState(1)
    const [Subvalue, setSubValue] = useState(1)
    const handleButtonClick = (e,flag) => {
        if(flag == 0) setObjValue(parseInt(e))
        else setSubValue(parseInt(e))
    }
    const handleSubmit = () => {
        if(!Objvalue || !Subvalue)
            Taro.showToast({
                title:'成绩未输入完毕',
                icon:'none',
                duration:1000
            })
        if(Objvalue <= 1 && Objvalue >= 0 && Subvalue <= 1 && Subvalue >= 0) {
            let date = new Date()
            Fetch('/exam/enterobjective',{
                user_id:post_id,
                result:Objvalue,
                time:date
            },'post').then(res=>{
                Fetch('/exam/entersubjective',{
                    user_id:post_id,
                    result:Subvalue,
                    time:date
                },'post').then(res=>{
                    Taro.showToast({title:'上传成功'})
                    handleClick()
                }).catch(err=>{
                    Taro.showToast({title:'上传失败'})
                })
            }).catch(err=>{
                Taro.showToast({title:'上传失败'})
            })
        } else {
            Taro.showToast({
                title:'请输入正确的成绩,0-未通过,1-通过',
                icon:'none',
                duration:1000
            })
        }
    }
    return (
        <>
        <View className='hover-bg'></View>
        <View className='hover-page'>
            <View className='hover-text'>提交成绩</View>
            <View className='input-wrap'>
                <View className='hover-label'>主观题成绩：</View>
                <Button className={!Subvalue? 'sub-button gray' : 'sub-button'} onClick={()=>handleButtonClick(1,1)}>通过</Button>
                <Button className={Subvalue? 'sub-button gray' : 'sub-button deny'} onClick={()=>handleButtonClick(0,1)}>不通过</Button>
                {/* <Input className='hover-input' onInput={(e)=>handleInput(e,1)} value={Subvalue}></Input> */}
            </View>
            <View className='input-wrap'>
                <View className='hover-label'>客观题成绩：</View>
                <Button className={!Objvalue? 'sub-button gray' : 'sub-button'} onClick={()=>handleButtonClick(1,0)}>通过</Button>
                <Button className={Objvalue? 'sub-button gray' : 'sub-button deny'} onClick={()=>handleButtonClick(0,0)}>不通过</Button>
                {/* <Input className='hover-input' onInput={(e)=>handleInput(e,0)} value={Objvalue}></Input> */}
            </View>
            <View className='button-wrap'>
                <Button className='hover-button quit' onClick={()=>handleClick()}>取消</Button>
                <Button className='hover-button' onClick={handleSubmit}>提交</Button>
            </View>
        </View>
        </>
    )
}
export const SearchItem = ({handlClick,item}) => {
    const {username,id,mobile} = item
    return (
        <>
        <View className='score-wrap'>
            <View className='score-info'>
                <View className='score-name'>{username}</View>
                <View className='score-mobile'>{mobile}</View>
            </View>
            <View className='score-button' onClick={()=>handlClick(id)}>录入成绩</View>
        </View>
        </>
    )
}
