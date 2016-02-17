# vanilla-js-tools
Contains VanillaJS HTML5 compliant tools

# tableSorter.js
Sorts any table, supports custom validators. Create a table, include the script and you're good to go. You can specify an explicit data-type if you'd like, for example:

```html
<table>
	<thead>
		<tr>
			<th>name</th>
			<th data-type="money">profit</th>
			<th data-type="number">shares</th>
			<th data-type="none">transactions</th>
		</tr>
	</thead>
	<tbody>
		<!-- content here -->	
	</tbody>
</table>
```

The `name` column will use default sorting, while the `transactions` will not be sortable. `shares` uses the built-in number sorting; while `profit` refers to a custom *money* sorter.

To sort this table; you would add:

```html
<script src="vanilla-js-tools/tableSorter.js"></script>
<script>
// Define a custom function to sort monetairy values
tableSorter.sortMoney = function(a, b)
{
	var aa = a.cells[this.SORTING_COLUMN].replace(/[^0-9.]/g, '');
	var bb = b.cells[this.SORTING_COLUMN].replace(/[^0-9.]/g, '');

	return parseFloat(aa) - parseFloat(bb);
}

window.addEventListener('load', function(){ tableSorter.initialize(); });
</script>
```
