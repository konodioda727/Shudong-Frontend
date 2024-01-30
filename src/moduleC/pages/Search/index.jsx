import  { useState } from "react";
import Taro, {useDidShow} from '@tarojs/taro'
import { View, ScrollView } from "@tarojs/components";
import "taro-ui/dist/style/index.scss";
import SearchBar from "../../../Components/searchbar";
import MsgItem from "../../../Components/msgItem";
import "./index.less";
import Fetch from "../../../Service/fetch";


const Search = (props) => {
  const chooseGroup = ["区域", "志愿者"];
  const values = ["rescue/address", "rescue/rescueteachername"];
  const tags = ['address','rescue_teacher_name']
  const { classnames } = props;
  const [url, seturl] = useState(values[0]);
  const [tag, settag] = useState(tags[0]);
  const [Choose, setChoose] = useState(chooseGroup[0]);
  const [indicatorShow, setindicatorShow] = useState(false);
  const [query, setquery] = useState("");
  const [form, setform] = useState([]);
  const [page, setpage] = useState(1);
  const [Mine, setMine] = useState()

  useDidShow(() => {
    getMyrescue()
  })
  const handleChoose = (index) => {
    setChoose(chooseGroup[index]);
    seturl(values[index]);
    settag(tags[index])
    handleShowIndicator();
  };
  const handleShowIndicator = () => {
    setindicatorShow(!indicatorShow);
  };
  const handleChange = (e) => {
    setquery(e);
  };
  function getMyrescue(){
    //  获取我的救援信息
          Fetch(
            '/rescue/claimed',
            {
              page:1,
              page_size:10
            },
            'POST'
          )
          .then(
            res=>
          { console.log(res)
            setMine(res.data.list)
          }).catch(error=>console.log(error))
    }
  const appendData = (flag, pagecur) => {
    console.log('flag,pagecur',flag,pagecur);
    Fetch(
      '/'+url,
      {
        page: pagecur ? pagecur : 1,
        page_size: 10,
        [`${tag}`]: query,
      },
      "post"
    )
      .then((res) => {
        if (res.data.list)
          if (flag) setform((prevData) => [...prevData, ...res.data.list]);
          else setform(res.data.list);
        else {
        if(flag)
          Taro.showToast({
            title: "没有更多了哦",
            icon: "none",
          });
        else 
        Taro.showToast({
            title: "未能找到相关数据",
            icon: "none",
          });
        }
      })
      .catch((err) => {
        Taro.showToast({
          title: "网络状况不佳",
          icon: "none",
        });
      });
  };
  const handleScroll = () => {
    console.log(page);
    setpage(page + 1);
    appendData(1, page + 1);
  };
  const handleSubmit = () => {
    appendData(0);
  };
  return (
    <>
      {indicatorShow && (
        <View
          className='hoverPage'
          onClick={() => setindicatorShow(false)}
        ></View>
      )}
      {/* 搜索框 */}
      <SearchBar
        className={classnames}
        query={query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      ></SearchBar>
      {/* 筛选条件 */}
      <View className='selector-wrap' onClick={handleShowIndicator}>
        <View className='infoSign'>筛选条件</View>
        <View className='indicator'>{Choose}</View>
        <View className={indicatorShow ? "tags movein" : "tags moveout"}>
          {chooseGroup.map((item, index) => (
            <View key='sugg' className='suggestion' onClick={() => handleChoose(index)}>
              {item}
            </View>
          ))}
        </View>
      </View>
      {/* 数据 */}
      <ScrollView
        scrollY
        className='dataset'
        onScrollToLower={handleScroll}
        style={{ height: "80vh" }}
      >
        {form &&
          form.map((item) => <MsgItem
            data={item}
            {...item}
            ifmine={form.some(itm => JSON.stringify(item) === JSON.stringify(itm))}
            key='item'
            flag='main'
          ></MsgItem>)}
      </ScrollView>
    </>
  );
};

export default Search;