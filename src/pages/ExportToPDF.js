export const setDefination = (
	orderID,
	date,
	products,
	totalAmount,
	logo,
	tip
) => {
	let __images = {};
	let formatArray = formatData(products, __images);

	return {
		content: [
			{
				text: "Receipt \n\n",
				fontSize: 20,
				color: "#707070",
			},
			{
				columns: [
					{
						text: `Order Id: ${orderID}`,
					},
					{
						alignment: "right",
						text: `Date : ${date}`,
					},
				],
			},
			{
				columns: [
					{
						text: "",
					},
					{
						text: "\n",
					},
				],
			},

			{
				columns: [
					{
						text: "",
					},
					{
						text: "\n",
					},
				],
			},
			{
				columns: [
					{
						text: `ABC Restaurant`,
					},
					{
						alignment: "right",
						image: "logo",
						width: 90,
						height: 40,
					},
				],
			},
			{
				columns: [
					{
						alignment: "left",
						text: `Address - new Delhi`,
					},
				],
			},
			{
				text: "\n\n",
			},
			{
				style: "tableExample",
				table: {
					headerRows: 1,
					widths: ["*", "*", "*", "*", "*", "*"],
					body: formatArray,
				},
				layout: {
					defaultBorder: false,
					hLineWidth: function (i, node) {
						return 1;
					},
					vLineWidth: function (i, node) {
						return 1;
					},
					hLineColor: function (i, node) {
						if (i === 1 || i === 0) {
							return "#bfdde8";
						}
						return "#eaeaea";
					},
					vLineColor: function (i, node) {
						return "#eaeaea";
					},
					hLineStyle: function (i, node) {
						// if (i === 0 || i === node.table.body.length) {
						return null;
						//}
					},
					paddingLeft: function (i, node) {
						return 10;
					},
					paddingRight: function (i, node) {
						return 10;
					},
					paddingTop: function (i, node) {
						return 2;
					},
					paddingBottom: function (i, node) {
						return 2;
					},
					fillColor: function (rowIndex, node, columnIndex) {
						return "#fff";
					},
				},
			},
			{
				alignment: "right",
				text: `Tip - ${tip}%\n`,
				bold: true,
			},
			{
				alignment: "right",
				text: `Total -  $${totalAmount}.00`,
				bold: true,
			},
		],

		styles: {
			tableExample: {
				margin: [0, 5, 0, 5],
			},
			tableHeader: {
				//  background : 'green',
				margin: [5, 10, 0, 10],
				fillColor: "#d8e1e3",
			},
			tableBody: {
				margin: [5, 10, 0, 10],
			},
		},

		images: {
			logo: logo,
			...__images,
		},
	};
};

const formatData = (products, images) => {
	let __tempData = [];
	__tempData.push([
		{ text: "#", style: "tableHeader" },
		{ text: "Image", style: "tableHeader" },
		{ text: "Food Name", style: "tableHeader" },
		{ text: "Description", style: "tableHeader" },
		{ text: "Count", style: "tableHeader" },
		{ text: "Cost", style: "tableHeader" },
	]);

	products.forEach((value, i) => {
		images[i] = `${value.url}`;
		__tempData.push([
			{
				text: i + 1,
				style: "tableBody",
				border: [false, false, false, true],
			},
			{
				image: `${i}`,
				fit: [50, 50],
				style: "tableBody",
				border: [false, false, false, true],
			},
			{
				text: value?.name,
				style: "tableBody",
				border: [false, false, false, true],
			},
			{
				text: value?.description,
				style: "tableBody",
				border: [false, false, false, true],
			},

			{
				text: value?.count,
				style: "tableBody",
				border: [false, false, false, true],
			},
			{
				text: value?.cost + ".00",
				style: "tableBody",
				border: [false, false, false, true],
			},
		]);
	});

	return __tempData;
};
