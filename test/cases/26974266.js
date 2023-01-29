// 这个 case 用于测试评论无评分的情况
const data = {
  title: 'TensorFlow实战',
  subtitle: '',
  original_title: '',
  id: '26974266',
  isbn: '9787121309120',
  author: ['黄文坚', '唐源'],
  translator: [],
  publish: '电子工业出版社',
  producer: '博文视点',
  publishDate: '2017-2-1',
  pages: '316',
  price: '79',
  binding: '平装',
  series: '博文视点AI系列',
  book_intro: 'Google近日发布了TensorFlow 1.0候选版，这个稳定版将是深度学习框架发展中的里程碑的一步。自TensorFlow于2015年底正式开源，距今已有一年多，这期间TensorFlow不断给人以惊喜，推出了分布式版本，服务框架TensorFlow Serving，可视化工具TensorFlow，上层封装TF.Learn，其他语言（Go、Java、Rust、Haskell）的绑定、Windows的支持、JIT编译器XLA、动态计算图框架Fold，以及数不胜数的经典模型在TensorFlow上的实现（Inception Net、SyntaxNet等）。在这一年多时间，TensorFlow已从初入深度学习框架大战的新星，成为了几近垄断的行业事实标准。\n《TensorFlow实战》希望用简单易懂的语言带领大家探索TensorFlow（基于1.0版本...',
  author_intro: 'Google近日发布了TensorFlow 1.0候选版，这个稳定版将是深度学习框架发展中的里程碑的一步。自TensorFlow于2015年底正式开源，距今已有一年多，这期间TensorFlow不断给人以惊喜，推出了分布式版本，服务框架TensorFlow Serving，可视化工具TensorFlow，上层封装TF.Learn，其他语言（Go、Java、Rust、Haskell）的绑定、Windows的支持、JIT编译器XLA、动态计算图框架Fold，以及数不胜数的经典模型在TensorFlow上的实现（Inception Net、SyntaxNet等）。在这一年多时间，TensorFlow已从初入深度学习框架大战的新星，成为了几近垄断的行业事实标准。\n《TensorFlow实战》希望用简单易懂的语言带领大家探索TensorFlow（基于1.0版本API）。在《TensorFlow实战》中我们讲述了TensorFlow的基础原理，TF和其他框架的异同。并用具体的代码完整地实现了各种类型的深度神经网络：AutoEncoder、MLP、CNN（AlexNet，VGGNet，Inception Net，ResNet）、Word2Vec、RNN（LSTM，Bi-RNN）、Deep Reinforcement Learning(Policy Network、Value Network)。此外，《TensorFlow实战》还讲解了TensorBoard、多GPU并行、分布式并行、TF.Learn和其他TF.Contrib组件。《TensorFlow实战》希望能帮读者快速入门TensorFlow和深度学习，在工业界或者研究中快速地将想法落地为可实践的模型。',
  catalog: ['1 TensorFlow基础 1', '1.1 TensorFlow概要 1', '1.2 TensorFlow编程模型简介 4', '2 TensorFlow和其他深度学习框架的对比 18', '2.1 主流深度学习框架对比 18', '2.2 各深度学习框架简介 20', '3 TensorFlow第一步 39', '3.1 TensorFlow的编译及安装 39', '3.2 TensorFlow实现SoftmaxRegression识别手写数字 46', '4 TensorFlow实现自编码器及多层感知机 55', '4.1 自编码器简介 55', '4.2 TensorFlow实现自编码器 59', '4.3 多层感知机简介 66', '4.4 TensorFlow实现多层感知机 70', '5 TensorFlow实现卷积神经网络 74', '5.1 卷积神经网络简介 74', '5.2 TensorFlow实现简单的卷积网络 80', '5.3 TensorFlow实现进阶的卷积网络 83', '6 TensorFlow实现经典卷积神经网络 95', '6.1 TensorFlow实现AlexNet 97', '6.2 TensorFlow实现VGGNet 108', '6.3 TensorFlow实现GoogleInceptionNet 119', '6.4 TensorFlow实现ResNet 143', '6.5 卷积神经网络发展趋势 156', '7 TensorFlow实现循环神经网络及Word2Vec 159', '7.1 TensorFlow实现Word2Vec 159', '7.2 TensorFlow实现基于LSTM的语言模型 173', '7.3 TensorFlow实现BidirectionalLSTMClassifier 188', '8 TensorFlow实现深度强化学习 195', '8.1 深度强化学习简介 195', '8.2 TensorFlow实现策略网络 201', '8.3 TensorFlow实现估值网络 213', '9 TensorBoard、多GPU并行及分布式并行 233', '9.1 TensorBoard 233', '9.2 多GPU并行 243', '9.3 分布式并行 249', '10 TF.Learn从入门到精通 259', '10.1 分布式Estimator 259', '10.2 深度学习Estimator 267', '10.3 机器学习Estimator 272', '10.4 DataFrame 278', '10.5 监督器Monitors 279', '11 TF.Contrib的其他组件 283', '11.1 统计分布 283', '11.2 Layer模块 285', '11.3 性能分析器tfprof 293', '参考文献 297'],
  original_texts: ['自编码器（AutoEncoder），顾名思义，即可以使用自身高阶特征编码自己。自编码器其实也是一种神经网络，它的输入和输出是一致的，它借助稀疏编码的思想，目标是使用稀疏的一些高阶特征重新组合来重构自己。因此，它的特征非常明显：第一，期望输入/ 输出一致；第二，希望使用高阶特征来重构自己，而不只是复制像素点。 '],
  labels: [],
  cover_url: 'https://img2.doubanio.com/view/subject/l/public/s29786442.jpg',
  url: 'https://book.douban.com/subject/26974266/',
  rating: {
    count: 237,
    info: '',
    value: 7.2,
    five_star_per: 38,
    four_star_per: 21.9,
    three_star_per: 26.6,
    two_star_per: 6.3,
    one_star_per: 7.2
  },
  comments: [],
  reviews: [],
  notes: []
};

module.exports = data;