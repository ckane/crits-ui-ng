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
  emails: {
    columns: [
      {Header: 'From', accessor: 'from'},
      {Header: 'Recip', accessor: 'to',
			 toValue: function(x) { return (x['to'].length) + (x['cc'].length); }},
      {Header: 'Subject', accessor: 'subject'},
      {Header: 'Date', accessor: 'date'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['from_address', 'to', 'cc', 'subject', 'date', 'source', 'status'],
    collection_title: "Emails"
  },
  events: {
    columns: [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Event Type', accessor: 'event_type'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'title', 'event_type', 'status', 'created', 'modified'],
    collection_title: "Events"
  },
  exploits: {
    columns: [
      {Header: 'Name', accessor: 'name'},
      {Header: 'CVE', accessor: 'cve'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'name', 'cve', 'description', 'status', 'created', 'modified'],
    collection_title: "Exploits"
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
  pcaps: {
    columns: [
      {Header: 'Filename', accessor: 'filename'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Length', accessor: 'length'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'filename', 'length', 'description', 'status', 'created', 'modified'],
    collection_title: "PCAPs"
  },
  raw_data: {
    columns: [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Data Type', accessor: 'data_type'},
      {Header: 'Version', accessor: 'version'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Created', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'title', 'data_type', 'version', 'status', 'created', 'modified'],
    collection_title: "Raw Data"
  },
  samples: {
    columns: [
      {Header: 'Filename', accessor: 'filename'},
      {Header: 'Size', accessor: 'size'},
      {Header: 'Filetype', accessor: 'filetype'},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Added', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'filename', 'filetype', 'size', 'status', 'created', 'modified'],
    collection_title: "Samples"
  },
  signatures: {
    columns: [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Data Type', accessor: 'data_type'},
      {Header: 'Version', accessor: 'version'},
      {Header: 'Data Type Min Version', accessor: 'data_type_min_version'},
      {Header: 'Data Type Max Version', accessor: 'data_type_max_version'},
      {Header: 'Data Type Dependency', accessor: 'data_type_dependency',
				  toValue: function(x) { return x['data_type_dependency'].join(', '); }},
      {Header: 'Source', accessor: 'source', sortable: false,
	        toValue: function(x) { return x['source'].map(function(y) { return y['name']}).join(', ')}},
      {Header: 'Added', accessor: 'created'},
      {Header: 'Last Modified', accessor: 'modified'},
      {Header: 'Status', accessor: 'status'},
    ],
    fieldset: ['source', 'title', 'data_type', 'version', 'data_type_min_version', 'data_type_max_version',
			         'data_type_dependency', 'status', 'created', 'modified'],
    collection_title: "Signatures"
  },
};
