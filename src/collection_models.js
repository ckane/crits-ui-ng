export var collection_tables = {
  ips: {
    columns: [
      {Header: 'Status', accessor: 'status'},
      {Header: 'IP', accessor: 'ip'},
      {Header: 'Source', accessor: 'source', sortable: false},
    ],
    fieldset: ['source', 'ip', 'status'],
    fieldToValue: (x) => { return {'status': x['status'], 'ip': x['ip'], 'source': x['source'][0]['name']}}
  }
};
