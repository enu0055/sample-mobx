const { makeObservable, observable, action, reaction } = mobx;



/**
 * 状態を管理するクラス
 *  今回は id="input-text" の value を監視する
 */
class Store {
  constructor() {
    this.value = '';

    makeObservable(this, {
      value: observable, // observable ... 値を監視
      setValue: action, // action ... 監視した値を変更するメソッドを定義
    })
  }

  /**
   * @{param} value - 入力された値
   */
  setValue(value) {
    this.value = value;
  }
}

const store = new Store();



window.addEventListener( 'DOMContentLoaded', () => {
  /**
   * 対象DOMの取得
   */
  const inputTextElement = document.getElementById('input-text');
  const previewElement   = document.getElementById('preview');

  /**
   * store.value の値が変更されたときの処理
   */
  reaction(
    () => store.value,
    value => previewElement.innerText = value,
  )

  /**
   * キー入力時 store.value の値を入力された値に変更する
   */
  function handleInput(e) {
    store.setValue(e.target.value);
  }

  /**
   * イベントの登録
   */
  inputTextElement.addEventListener( 'keypress', handleInput );
  inputTextElement.addEventListener( 'keyup', handleInput );
});
