import Taro, { useRouter } from "@tarojs/taro";
import { useRef } from "react";
import { View ,Button} from "@tarojs/components";
import { CanvasSign} from '../../components/CanvasSign'
import "./index.less"; 

const QuestionList = () => {
  const signRef = useRef(null);
  const router = useRouter();

  // 确认签名完成
  const onSubmit = async () => {
    console.log('submit')
    const result = await signRef.current?.saveAsImage()
    if (!result) return console.error('签名失败')
    console.log(signRef.current.saveAsImage)
    console.log(result)
    // 用事件总线把导出的签名图发射出去
    Taro.eventCenter.trigger(router.params.type || '', { url: result.tempFilePath });
    Taro.navigateBack({ delta: 1 });
  }

  const onClear = () => {
    signRef.current?.clear();
  }

  const onCancel = () => {
    Taro.navigateBack({ delta: 1 });

  }

  return (
    <View className='container'>
      <CanvasSign ref={signRef} />

      <View className='btns'>
        <Button className='btn' type='primary' plain color='#00D3A3' onClick={onClear}>
          重置
        </Button>
        <Button className='btn' type='primary' plain color='#00D3A3' onClick={onCancel}>
          取消
        </Button>
        <Button className='btn' type='primary' color='#00D3A3' onClick={onSubmit}>
          提交
        </Button>
      </View>
    </View>
  );
};

export default QuestionList;
