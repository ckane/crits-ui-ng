export var collection_tables = {
  actors: {
    columns: [
      {Header: 'Name', accessor: 'name'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x.map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'name', 'description', 'status', 'created', 'modified'],
    collection_title: "Actors"
  },
  backdoors: {
    columns: [
      {Header: 'Name', accessor: 'name'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Version', accessor: 'version'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x.map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'name', 'description', 'version', 'status', 'created', 'modified'],
    collection_title: "Backdoors"
  },
  domains: {
    columns: [
      {Header: 'Domain', accessor: 'domain'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'domain', 'status', 'created', 'modified'],
    collection_title: "Domains"
  },
  ips: {
    columns: [
      {Header: 'IP', accessor: 'ip'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'ip', 'status', 'created', 'modified'],
    collection_title: "IPs"
  },
  indicators: {
    columns: [
      {Header: 'Value', accessor: 'value'},
      {Header: 'Type', accessor: 'type'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'value', 'ind_type', 'status', 'created', 'modified'],
    collection_title: "Indicators"
  },
};
