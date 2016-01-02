/**************************************************************************
* LOGOSWARE Class Library.
*
* Copyright 2009 (c) LOGOSWARE (http://www.logosware.com) All rights reserved.
*
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU General Public License as published by the Free Software
* Foundation; either version 2 of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License along with
* this program; if not, write to the Free Software Foundation, Inc., 59 Temple
* Place, Suite 330, Boston, MA 02111-1307 USA
*
**************************************************************************/ 
package com
{
	import flash.events.Event;
	
	/**
	 * QRコードのデコード完了イベントを送出します
	 */
	public class QRdecoderEvent extends Event
	{
		// 定数( Class constants )
		
		/**
		 * デコード完了を通知します。
		 * @eventType QR_DECODE_COMPLETE
		 **/
		public static const QR_DECODE_COMPLETE:String = "QR_DECODE_COMPLETE";
		
		// プロパティ( Proerties )
		
		/**
		 * 解析した結果の文字列が� �納されます
		 **/
		public var data:String;
		/**
		 * 解析に用いたコード配列が� �納されます
		 **/
		public var checkArray:Array;
		
		// コンストラクタ( Constructor )
		
		/**
		 * コンストラクタ
		 * @param type イベントタイプ
		 * @param data 抽出文字列
		 * @param check 入力したコード
		 **/
        public function QRdecoderEvent(type:String, data:String, check:Array){
            super(type);
            // 新しいプロパティを設定する
           this.data = data;
           this.checkArray = check;
        }
        // Eventからオーバーライドしたメソッド( Overridden Method: Event )
        /**
        * @private
        **/
        override public function clone():Event {
            return new QRdecoderEvent(type, data, checkArray);
        }
	}
}