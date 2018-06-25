export var collection_tables = {
  actors: {
    columns: [
      {Header: 'Name', accessor: 'name'},
      {Header: 'Description', accessor: 'description'},
    ],
    fieldset: ['name', 'description'],
    collection_title: "Actors"
  },
  backdoors: {
    columns: [
      {Header: 'Name', accessor: 'name'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Version', accessor: 'version'},
    ],
    fieldset: ['name', 'description', 'version'],
    collection_title: "Backdoors"
  },
  domains: {
    columns: [
      {Header: 'Domain', accessor: 'domain'},
    ],
    fieldset: ['domain'],
    collection_title: "Domains"
  },
  emails: {
    columns: [
      {Header: 'From', accessor: 'from'},
      {Header: 'Recip', accessor: 'to',
			 toValue: function(x) { return (x['to'].length) + (x['cc'].length); }},
      {Header: 'Subject', accessor: 'subject'},
      {Header: 'Date', accessor: 'date'},
    ],
    fieldset: ['from_address', 'to', 'cc', 'subject', 'date'],
    collection_title: "Emails"
  },
  events: {
    columns: [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Event Type', accessor: 'event_type'},
    ],
    fieldset: ['title', 'event_type', 'status'],
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
    fieldset: ['name', 'cve', 'description'],
    collection_title: "Exploits"
  },
  ips: {
    columns: [
      {Header: 'IP', accessor: 'ip'},
    ],
    fieldset: ['ip'],
    collection_title: "IPs"
  },
  indicators: {
    columns: [
      {Header: 'Value', accessor: 'value'},
      {Header: 'Type', accessor: 'type'},
    ],
    fieldset: ['value', 'ind_type'],
    collection_title: "Indicators"
  },
  pcaps: {
    columns: [
      {Header: 'Filename', accessor: 'filename'},
      {Header: 'Description', accessor: 'description'},
      {Header: 'Length', accessor: 'length'},
    ],
    fieldset: ['filename', 'length', 'description'],
    collection_title: "PCAPs"
  },
  raw_data: {
    columns: [
      {Header: 'Title', accessor: 'title'},
      {Header: 'Data Type', accessor: 'data_type'},
      {Header: 'Version', accessor: 'version'},
    ],
    fieldset: ['title', 'data_type', 'version'],
    collection_title: "Raw Data"
  },
  samples: {
    columns: [
      {Header: 'Filename', accessor: 'filename'},
      {Header: 'Size', accessor: 'size'},
      {Header: 'Filetype', accessor: 'filetype'},
    ],
    fieldset: ['filename', 'filetype', 'size'],
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
    ],
    fieldset: ['title', 'data_type', 'version', 'data_type_min_version', 'data_type_max_version',
			         'data_type_dependency'],
    collection_title: "Signatures"
  },
};
