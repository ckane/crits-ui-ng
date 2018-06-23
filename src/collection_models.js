export var collection_tables = {
  ips: {
    columns: [
      {Header: 'Status', accessor: 'status'},
      {Header: 'IP', accessor: 'ip'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x.map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
    ],
    fieldset: ['source', 'ip', 'status', 'created', 'modified'],
    collection_title: "IPs"
  },
  indicators: {
    columns: [
      {Header: 'Status', accessor: 'status'},
      {Header: 'Value', accessor: 'value'},
      {Header: 'Type', accessor: 'type'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x.map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
    ],
    fieldset: ['source', 'value', 'ind_type', 'status', 'created', 'modified'],
    collection_title: "Indicators"
  },
};
