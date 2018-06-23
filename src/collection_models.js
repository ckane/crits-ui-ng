export var collection_tables = {
  ips: {
    columns: [
      {Header: 'Status', accessor: 'status'},
      {Header: 'IP', accessor: 'ip'},
      {Header: 'Source', accessor: 'source', sortable: false},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
    ],
    fieldset: ['source', 'ip', 'status', 'created', 'modified'],
    fieldToValue: (x) => { return {'status': x['status'], 'ip': x['ip'],
	                           'source': x['source'].map(function(y) { return y['name']}).join(', '),
                                   'created': x['created'], 'modified': x['modified']}},
  },
  indicators: {
    columns: [
      {Header: 'Status', accessor: 'status'},
      {Header: 'Value', accessor: 'value'},
      {Header: 'Type', accessor: 'type'},
      {Header: 'Source', accessor: 'source', sortable: false},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
    ],
    fieldset: ['source', 'value', 'ind_type', 'status', 'created', 'modified'],
    fieldToValue: (x) => { return {'status': x['status'], 'value': x['value'],
	                           'source': x['source'].map(function(y) { return y['name']}).join(', '),
                                   'created': x['created'], 'modified': x['modified'], 'type': x['type']}},
  },
};
