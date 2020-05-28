const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
module.exports={
	// mode默认production会压缩  development不会压缩
	mode:'development',
	// enter 入口省略了main
	// entry: './src/index.js',
	entry: {
		main:'./src/index.js',
		sub:'./src/index.js',
	},
	// module里面配置图片首先安装file-loader
	module:{
		rules:[{
			test:/\.(jpg|png|gif|woff|svg|eot|ttf)$/,
			use:{
				// loader:'file-loader',直接生成图片
				loader:'url-loader',//生成base64位的字符串打包在js文件中
				options:{
					// placeholder 占位符
					name:'[name]_[hash].[ext]',
					outputPath:'images/',//规定生成的路径
					limit:1024//超小于此大小打包在js中，超过打包在规定生成的路径中

				}
			}
		},{
			test:/\.(woff|svg|eot|ttf)$/,
			use:{
				// loader:'file-loader',直接生成图片
				loader:'file-loader',//生成base64位的字符串打包在js文件中
			}
		},{
			test:/\.scss$/,
			use:[
			'style-loader',
			// 'css-loader',
			// css配置项
			{
				loader:'css-loader',
				options:{
					//在css里面引入别的css不会走下面的loader只会走style-loader，2代表可以走两次improt嵌套
					importLoaders:2,
					// 使用局部样式，避免全局使用
					// modules:true
				}
			},
			'sass-loader',
			'postcss-loader'
			]
		}]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:'src/index.html'
		})
		
	 ],
	output:{
		// publicPath:'http://cdn.com.cn',//可以把生成的js放在cdn下面
		filename:'[name].bundle.js',
		path:path.resolve(__dirname, 'dist')
	}
}