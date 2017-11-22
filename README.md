# TD4 Emurator

「[CPUの創り方](https://www.amazon.co.jp/dp/4839909865)」で製作する4bit CPUのブラウザで動くエミュレータです
※まだまだ製作中

# CPUの仕様
## レジスタ構成
### 演算用レジスタ
- AとBの二つ
- リセット直後のレジスタの値は「0000」となる

### プラグラムカウンタ
- プログラムカウンタも4bit
- プログラムは最大でも16ステップまでとなる

### フラグ
- C(キャリー)のみ

### I/Oポート
- 入出力ともに4bit
- リセット直後の出力ポートは「0000」になる

## 命令フォーマット
- すべての命令は8bitで構成される
- 上位4bitがオペレーションコード
- 下位4bitがイミディエイトデータ
- イミディエイトデータが不要な命令の場合、bit3～bit0を0で満たす必要がある

```
|                 命令                  |
|bit7|bit6|bit5|bit4|bit3|bit2|bit1|bit0|
 MSB                                 LSB
|オペレーションコード |イミディエイトデータ |
```

## 命令一覧
### 算術演算
算術演算はAまたはBレジスタとイミディエイトデータ(Im)間での加算のみ可能

※CODE=オペレーションコード

※Im=イミディエイトデータ

|CODE|アセンブリ|説明|
|----|----------|----------------------------------------|
|0000|ADD A,Im|A<-A+Im(算術)|
|0101|ADD B,Im|B<-B+Im(算術)|
|0011|MOV A,Im|A<-Im(データ転送)|
|0111|MOV B,Im|B<-Im(データ転送)|
|0001|MOV A,B|A<-B(データ転送)|
|0100|MOV B,A|B<-A(データ転送)|
|1111|JPM Im|Imのアドレスへジャンプ|
|1110|JNC Im|Cフラグがセットされていないときにジャンプ|
|0010|IN  A|入力ポートからAレジスタへ転送|
|0110|IN  B|入力ポートからBレジスタへ転送|
|1001|OUT B|Bレジスタのデータを出力ポートへ転送|
|1011|OUT Im|イミディエイトデータを出力ポートへ転送|

NOP命令はないが、命令「0000 0000(2進数)」は事実上のNOP

# TODO
- スタイルの更新
  - CSS grid designをやってみたい
- ESLintの導入
- フォーマッタ―の導入
- ブラウザキャッシュ対策