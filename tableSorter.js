/*
	tableSorter.js - VanillaJs HTML5 compliant table sorter

	Copyright (c) 2016 Sjon Hortensius

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

NodeList.prototype.forEach =
 HTMLCollection.prototype.forEach = function (cb){
	Array.prototype.forEach.call(this, cb);
}

var tableSorter = {};
(function()
{
	"use strict";
	var SORTING_COLUMN;

	this.initialize = function()
	{
		document.getElementsByTagName('table').forEach(function(table){
			if (table.tHead.rows.length < 1)
				throw new Error('tableSorter requires a THEAD to be present');

			table.tHead.rows[0].childNodes.forEach(function(cell){
				cell.addEventListener('click', this.reOrder.bind(this));
			}.bind(this));
		}.bind(this));
	}

	this.reOrder = function(e)
	{
		var col = e.target, t = col.parentNode.parentNode.parentNode;
		if ('none' == col.dataset.type)
			return;

		var dataType = col.dataset.type || 'default';
		var sortCb = 'sort' + dataType.charAt(0).toUpperCase() + dataType.substr(1);
		if ('function' != typeof this[sortCb])
			throw new Error('Please create a sort method for data-type: '+ dataType);

		col.dataset.sortOrder = col.dataset.sortOrder == 'asc' ? 'desc' : 'asc';

		t.classList.add('sorted');

		this.SORTING_COLUMN = col.cellIndex;
		t.tBodies.forEach(function (b){
			var rows = [];
			b.rows.forEach(function(row){
				rows.push(row);
			});

			rows.sort(this[sortCb].bind(this));

			if ('desc' == col.dataset.sortOrder)
				rows.reverse();

			for (var i=0; i<rows.length; i++)
				b.appendChild(rows[i]);
		}.bind(this));
	}

	this.sortNumber = function(a, b)
	{
		var aa = parseFloat(a.cells[this.SORTING_COLUMN].textContent) || 0;
		var bb = parseFloat(b.cells[this.SORTING_COLUMN].textContent) || 0;

		return aa - bb;
	}

	this.sortDefault = function(a, b)
	{
		var aa = a.cells[this.SORTING_COLUMN].textContent;
		var bb = b.cells[this.SORTING_COLUMN].textContent;

		if (aa == bb)
			return 0;
		else if (aa < bb)
			return -1;
		else
			return 1;
	}
}).apply(tableSorter);