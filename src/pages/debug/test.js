export const schemaData={
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://schema.getpostman.com/json/collection/v2.1.0/",
  "type": "object",
  "properties": {
    "info": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/info",
      "title": "Information",
      "description": "Detailed description of the info block",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name of the collection",
          "description": "A collection's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this collection among a bunch of other collections, as such outlining its usage or content."
        },
        "_postman_id": {
          "type": "string",
          "description": "Every collection is identified by the unique value of this field. The value of this field is usually easiest to generate using a UID generator function. If you already have a collection, it is recommended that you maintain the same id since changing the id usually implies that is a different collection than it was originally.\n *Note: This field exists for compatibility reasons with Collection Format V1.*"
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "version": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/version",
          "title": "Collection Version",
          "description": "Postman allows you to version your collections as they grow, and this field holds the version number. While optional, it is recommended that you use this field to its fullest extent!",
          "oneOf": [
            {
              "type": "object",
              "properties": {
                "major": {
                  "description": "Increment this number if you make changes to the collection that changes its behaviour. E.g: Removing or adding new test scripts. (partly or completely).",
                  "minimum": 0,
                  "type": "integer"
                },
                "minor": {
                  "description": "You should increment this number if you make changes that will not break anything that uses the collection. E.g: removing a folder.",
                  "minimum": 0,
                  "type": "integer"
                },
                "patch": {
                  "description": "Ideally, minor changes to a collection should result in the increment of this number.",
                  "minimum": 0,
                  "type": "integer"
                },
                "identifier": {
                  "description": "A human friendly identifier to make sense of the version numbers. E.g: 'beta-3'",
                  "type": "string",
                  "maxLength": 10
                },
                "meta": {}
              },
              "required": [
                "major",
                "minor",
                "patch"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "schema": {
          "description": "This should ideally hold a link to the Postman schema that is used to validate this collection. E.g: https://schema.getpostman.com/collection/v1",
          "type": "string"
        }
      },
      "required": [
        "name",
        "schema"
      ]
    },
    "item": {
      "type": "array",
      "description": "Items are the basic unit for a Postman collection. You can think of them as corresponding to a single API endpoint. Each Item has one request and may have multiple API responses associated with it.",
      "items": {
        "title": "Items",
        "oneOf": [
          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Item",
            "id": "#/definitions/item",
            "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it.",
            "properties": {
              "id": {
                "type": "string",
                "description": "A unique ID that is used to identify collections internally"
              },
              "name": {
                "type": "string",
                "description": "A human readable identifier for the current item."
              },
              "description": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/description",
                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                "oneOf": [
                  {
                    "type": "object",
                    "title": "Description",
                    "properties": {
                      "content": {
                        "type": "string",
                        "description": "The content of the description goes here, as a raw string."
                      },
                      "type": {
                        "type": "string",
                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                      },
                      "version": {
                        "description": "Description can have versions associated with it, which should be put in this property."
                      }
                    }
                  },
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "variable": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/variable-list",
                "title": "Variable List",
                "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
                "type": "array",
                "items": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/variable",
                  "title": "Variable",
                  "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                      "type": "string"
                    },
                    "key": {
                      "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                      "type": "string"
                    },
                    "value": {
                      "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                    },
                    "type": {
                      "description": "A variable may have multiple types. This field specifies the type of the variable.",
                      "type": "string",
                      "enum": [
                        "string",
                        "boolean",
                        "any",
                        "number"
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Variable name"
                    },
                    "description": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/description",
                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                      "oneOf": [
                        {
                          "type": "object",
                          "title": "Description",
                          "properties": {
                            "content": {
                              "type": "string",
                              "description": "The content of the description goes here, as a raw string."
                            },
                            "type": {
                              "type": "string",
                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                            },
                            "version": {
                              "description": "Description can have versions associated with it, which should be put in this property."
                            }
                          }
                        },
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "system": {
                      "type": "boolean",
                      "default": false,
                      "description": "When set to true, indicates that this variable has been set by Postman"
                    },
                    "disabled": {
                      "type": "boolean",
                      "default": false
                    }
                  },
                  "anyOf": [
                    {
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "required": [
                        "key"
                      ]
                    },
                    {
                      "required": [
                        "id",
                        "key"
                      ]
                    }
                  ]
                }
              },
              "event": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/event-list",
                "title": "Event List",
                "type": "array",
                "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
                "items": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/event",
                  "title": "Event",
                  "description": "Defines a script associated with an associated event name",
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "A unique identifier for the enclosing event."
                    },
                    "listen": {
                      "type": "string",
                      "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
                    },
                    "script": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/script",
                      "title": "Script",
                      "type": "object",
                      "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
                      "properties": {
                        "id": {
                          "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                          "type": "string"
                        },
                        "type": {
                          "description": "Type of the script. E.g: 'text/javascript'",
                          "type": "string"
                        },
                        "exec": {
                          "oneOf": [
                            {
                              "type": "array",
                              "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                              "items": {
                                "type": "string"
                              }
                            },
                            {
                              "type": "string"
                            }
                          ]
                        },
                        "src": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                          "id": "#/definitions/url",
                          "title": "Url",
                          "oneOf": [
                            {
                              "type": "object",
                              "properties": {
                                "raw": {
                                  "type": "string",
                                  "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                                },
                                "protocol": {
                                  "type": "string",
                                  "description": "The protocol associated with the request, E.g: 'http'"
                                },
                                "host": {
                                  "title": "Host",
                                  "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      },
                                      "description": "The host, split into subdomain strings."
                                    }
                                  ]
                                },
                                "path": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "array",
                                      "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                      "items": {
                                        "oneOf": [
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "object",
                                            "properties": {
                                              "type": {
                                                "type": "string"
                                              },
                                              "value": {
                                                "type": "string"
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                },
                                "port": {
                                  "type": "string",
                                  "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                                },
                                "query": {
                                  "type": "array",
                                  "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                  "items": {
                                    "type": "object",
                                    "title": "QueryParam",
                                    "properties": {
                                      "key": {
                                        "oneOf": [
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "value": {
                                        "oneOf": [
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "disabled": {
                                        "type": "boolean",
                                        "default": false,
                                        "description": "If set to true, the current query parameter will not be sent with the request."
                                      },
                                      "description": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/description",
                                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                        "oneOf": [
                                          {
                                            "type": "object",
                                            "title": "Description",
                                            "properties": {
                                              "content": {
                                                "type": "string",
                                                "description": "The content of the description goes here, as a raw string."
                                              },
                                              "type": {
                                                "type": "string",
                                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                              },
                                              "version": {
                                                "description": "Description can have versions associated with it, which should be put in this property."
                                              }
                                            }
                                          },
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      }
                                    }
                                  }
                                },
                                "hash": {
                                  "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                  "type": "string"
                                },
                                "variable": {
                                  "type": "array",
                                  "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                  "items": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/variable",
                                    "title": "Variable",
                                    "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                        "type": "string"
                                      },
                                      "key": {
                                        "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                        "type": "string"
                                      },
                                      "value": {
                                        "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                      },
                                      "type": {
                                        "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                        "type": "string",
                                        "enum": [
                                          "string",
                                          "boolean",
                                          "any",
                                          "number"
                                        ]
                                      },
                                      "name": {
                                        "type": "string",
                                        "description": "Variable name"
                                      },
                                      "description": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/description",
                                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                        "oneOf": [
                                          {
                                            "type": "object",
                                            "title": "Description",
                                            "properties": {
                                              "content": {
                                                "type": "string",
                                                "description": "The content of the description goes here, as a raw string."
                                              },
                                              "type": {
                                                "type": "string",
                                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                              },
                                              "version": {
                                                "description": "Description can have versions associated with it, which should be put in this property."
                                              }
                                            }
                                          },
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "system": {
                                        "type": "boolean",
                                        "default": false,
                                        "description": "When set to true, indicates that this variable has been set by Postman"
                                      },
                                      "disabled": {
                                        "type": "boolean",
                                        "default": false
                                      }
                                    },
                                    "anyOf": [
                                      {
                                        "required": [
                                          "id"
                                        ]
                                      },
                                      {
                                        "required": [
                                          "key"
                                        ]
                                      },
                                      {
                                        "required": [
                                          "id",
                                          "key"
                                        ]
                                      }
                                    ]
                                  }
                                }
                              }
                            },
                            {
                              "type": "string"
                            }
                          ]
                        },
                        "name": {
                          "type": "string",
                          "description": "Script name"
                        }
                      }
                    },
                    "disabled": {
                      "type": "boolean",
                      "default": false,
                      "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
                    }
                  },
                  "required": [
                    "listen"
                  ]
                }
              },
              "request": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/request",
                "title": "Request",
                "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
                "oneOf": [
                  {
                    "type": "object",
                    "title": "Request",
                    "properties": {
                      "url": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                        "id": "#/definitions/url",
                        "title": "Url",
                        "oneOf": [
                          {
                            "type": "object",
                            "properties": {
                              "raw": {
                                "type": "string",
                                "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                              },
                              "protocol": {
                                "type": "string",
                                "description": "The protocol associated with the request, E.g: 'http'"
                              },
                              "host": {
                                "title": "Host",
                                "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The host, split into subdomain strings."
                                  }
                                ]
                              },
                              "path": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "array",
                                    "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                    "items": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "type": {
                                              "type": "string"
                                            },
                                            "value": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              },
                              "port": {
                                "type": "string",
                                "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                              },
                              "query": {
                                "type": "array",
                                "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                "items": {
                                  "type": "object",
                                  "title": "QueryParam",
                                  "properties": {
                                    "key": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "value": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "If set to true, the current query parameter will not be sent with the request."
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    }
                                  }
                                }
                              },
                              "hash": {
                                "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                "type": "string"
                              },
                              "variable": {
                                "type": "array",
                                "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/variable",
                                  "title": "Variable",
                                  "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                      "type": "string"
                                    },
                                    "key": {
                                      "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                      "type": "string"
                                    },
                                    "value": {
                                      "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                    },
                                    "type": {
                                      "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                      "type": "string",
                                      "enum": [
                                        "string",
                                        "boolean",
                                        "any",
                                        "number"
                                      ]
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "Variable name"
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "system": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "When set to true, indicates that this variable has been set by Postman"
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false
                                    }
                                  },
                                  "anyOf": [
                                    {
                                      "required": [
                                        "id"
                                      ]
                                    },
                                    {
                                      "required": [
                                        "key"
                                      ]
                                    },
                                    {
                                      "required": [
                                        "id",
                                        "key"
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          },
                          {
                            "type": "string"
                          }
                        ]
                      },
                      "auth": {
                        "oneOf": [
                          {
                            "type": "null"
                          },
                          {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth",
                            "description": "Represents authentication helpers provided by Postman",
                            "properties": {
                              "type": {
                                "type": "string",
                                "enum": [
                                  "apikey",
                                  "awsv4",
                                  "basic",
                                  "bearer",
                                  "digest",
                                  "edgegrid",
                                  "hawk",
                                  "noauth",
                                  "oauth1",
                                  "oauth2",
                                  "ntlm"
                                ]
                              },
                              "noauth": {},
                              "apikey": {
                                "type": "array",
                                "title": "API Key Authentication",
                                "description": "The attributes for API Key Authentication.",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "awsv4": {
                                "type": "array",
                                "title": "AWS Signature v4",
                                "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "basic": {
                                "type": "array",
                                "title": "Basic Authentication",
                                "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "bearer": {
                                "type": "array",
                                "title": "Bearer Token Authentication",
                                "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "digest": {
                                "type": "array",
                                "title": "Digest Authentication",
                                "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "edgegrid": {
                                "type": "array",
                                "title": "EdgeGrid Authentication",
                                "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "hawk": {
                                "type": "array",
                                "title": "Hawk Authentication",
                                "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "ntlm": {
                                "type": "array",
                                "title": "NTLM Authentication",
                                "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "oauth1": {
                                "type": "array",
                                "title": "OAuth1",
                                "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "oauth2": {
                                "type": "array",
                                "title": "OAuth2",
                                "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              }
                            },
                            "required": [
                              "type"
                            ]
                          }
                        ]
                      },
                      "proxy": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/proxy-config",
                        "title": "Proxy Config",
                        "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                        "type": "object",
                        "properties": {
                          "match": {
                            "default": "http+https://*/*",
                            "description": "The Url match for which the proxy config is defined",
                            "type": "string"
                          },
                          "host": {
                            "type": "string",
                            "description": "The proxy server host"
                          },
                          "port": {
                            "type": "integer",
                            "minimum": 0,
                            "default": 8080,
                            "description": "The proxy server port"
                          },
                          "tunnel": {
                            "description": "The tunneling details for the proxy config",
                            "default": false,
                            "type": "boolean"
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "When set to true, ignores this proxy configuration entity"
                          }
                        }
                      },
                      "certificate": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/certificate",
                        "title": "Certificate",
                        "description": "A representation of an ssl certificate",
                        "type": "object",
                        "properties": {
                          "name": {
                            "description": "A name for the certificate for user reference",
                            "type": "string"
                          },
                          "matches": {
                            "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                            "type": "array",
                            "items": {
                              "type": "string",
                              "description": "An Url match pattern string"
                            }
                          },
                          "key": {
                            "description": "An object containing path to file containing private key, on the file system",
                            "type": "object",
                            "properties": {
                              "src": {
                                "description": "The path to file containing key for certificate, on the file system"
                              }
                            }
                          },
                          "cert": {
                            "description": "An object containing path to file certificate, on the file system",
                            "type": "object",
                            "properties": {
                              "src": {
                                "description": "The path to file containing key for certificate, on the file system"
                              }
                            }
                          },
                          "passphrase": {
                            "description": "The passphrase for the certificate",
                            "type": "string"
                          }
                        }
                      },
                      "method": {
                        "anyOf": [
                          {
                            "description": "The Standard HTTP method associated with this request.",
                            "type": "string",
                            "enum": [
                              "GET",
                              "PUT",
                              "POST",
                              "PATCH",
                              "DELETE",
                              "COPY",
                              "HEAD",
                              "OPTIONS",
                              "LINK",
                              "UNLINK",
                              "PURGE",
                              "LOCK",
                              "UNLOCK",
                              "PROPFIND",
                              "VIEW"
                            ]
                          },
                          {
                            "description": "The Custom HTTP method associated with this request.",
                            "type": "string"
                          }
                        ]
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "header": {
                        "oneOf": [
                          {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/header-list",
                            "title": "Header List",
                            "description": "A representation for a list of headers",
                            "type": "array",
                            "items": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "type": "object",
                              "title": "Header",
                              "id": "#/definitions/header",
                              "description": "Represents a single HTTP Header",
                              "properties": {
                                "key": {
                                  "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "The value (or the RHS) of the Header is stored in this field."
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "If set to true, the current header will not be sent with requests."
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              },
                              "required": [
                                "key",
                                "value"
                              ]
                            }
                          },
                          {
                            "type": "string"
                          }
                        ]
                      },
                      "body": {
                        "oneOf": [
                          {
                            "type": "object",
                            "description": "This field contains the data usually contained in the request body.",
                            "properties": {
                              "mode": {
                                "description": "Postman stores the type of data associated with this request in this field.",
                                "enum": [
                                  "raw",
                                  "urlencoded",
                                  "formdata",
                                  "file",
                                  "graphql"
                                ]
                              },
                              "raw": {
                                "type": "string"
                              },
                              "urlencoded": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "title": "UrlEncodedParameter",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "formdata": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "title": "FormParameter",
                                  "anyOf": [
                                    {
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {
                                          "type": "string"
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, prevents this form data entity from being sent."
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "text"
                                          ]
                                        },
                                        "contentType": {
                                          "type": "string",
                                          "description": "Override Content-Type header of this form data entity."
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    },
                                    {
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "src": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            },
                                            {
                                              "type": "array"
                                            }
                                          ]
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, prevents this form data entity from being sent."
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "file"
                                          ]
                                        },
                                        "contentType": {
                                          "type": "string",
                                          "description": "Override Content-Type header of this form data entity."
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  ]
                                }
                              },
                              "file": {
                                "type": "object",
                                "properties": {
                                  "src": {
                                    "oneOf": [
                                      {
                                        "type": "string",
                                        "description": "Contains the name of the file to upload. _Not the path_."
                                      },
                                      {
                                        "type": "null",
                                        "description": "A null src indicates that no file has been selected as a part of the request body"
                                      }
                                    ]
                                  },
                                  "content": {
                                    "type": "string"
                                  }
                                }
                              },
                              "graphql": {
                                "type": "object"
                              },
                              "options": {
                                "type": "object",
                                "description": "Additional configurations and options set for various body modes."
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, prevents request body from being sent."
                              }
                            }
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "response": {
                "type": "array",
                "title": "Responses",
                "items": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/response",
                  "title": "Response",
                  "description": "A response represents an HTTP response.",
                  "properties": {
                    "id": {
                      "description": "A unique, user defined identifier that can  be used to refer to this response from requests.",
                      "type": "string"
                    },
                    "originalRequest": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/request",
                      "title": "Request",
                      "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
                      "oneOf": [
                        {
                          "type": "object",
                          "title": "Request",
                          "properties": {
                            "url": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                              "id": "#/definitions/url",
                              "title": "Url",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "raw": {
                                      "type": "string",
                                      "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                                    },
                                    "protocol": {
                                      "type": "string",
                                      "description": "The protocol associated with the request, E.g: 'http'"
                                    },
                                    "host": {
                                      "title": "Host",
                                      "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          },
                                          "description": "The host, split into subdomain strings."
                                        }
                                      ]
                                    },
                                    "path": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "array",
                                          "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                          "items": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "type": {
                                                    "type": "string"
                                                  },
                                                  "value": {
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    },
                                    "port": {
                                      "type": "string",
                                      "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                                    },
                                    "query": {
                                      "type": "array",
                                      "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                      "items": {
                                        "type": "object",
                                        "title": "QueryParam",
                                        "properties": {
                                          "key": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "value": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false,
                                            "description": "If set to true, the current query parameter will not be sent with the request."
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    },
                                    "hash": {
                                      "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                      "type": "string"
                                    },
                                    "variable": {
                                      "type": "array",
                                      "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/variable",
                                        "title": "Variable",
                                        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                            "type": "string"
                                          },
                                          "key": {
                                            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                            "type": "string"
                                          },
                                          "value": {
                                            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                          },
                                          "type": {
                                            "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                            "type": "string",
                                            "enum": [
                                              "string",
                                              "boolean",
                                              "any",
                                              "number"
                                            ]
                                          },
                                          "name": {
                                            "type": "string",
                                            "description": "Variable name"
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "system": {
                                            "type": "boolean",
                                            "default": false,
                                            "description": "When set to true, indicates that this variable has been set by Postman"
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false
                                          }
                                        },
                                        "anyOf": [
                                          {
                                            "required": [
                                              "id"
                                            ]
                                          },
                                          {
                                            "required": [
                                              "key"
                                            ]
                                          },
                                          {
                                            "required": [
                                              "id",
                                              "key"
                                            ]
                                          }
                                        ]
                                      }
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                }
                              ]
                            },
                            "auth": {
                              "oneOf": [
                                {
                                  "type": "null"
                                },
                                {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth",
                                  "description": "Represents authentication helpers provided by Postman",
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "apikey",
                                        "awsv4",
                                        "basic",
                                        "bearer",
                                        "digest",
                                        "edgegrid",
                                        "hawk",
                                        "noauth",
                                        "oauth1",
                                        "oauth2",
                                        "ntlm"
                                      ]
                                    },
                                    "noauth": {},
                                    "apikey": {
                                      "type": "array",
                                      "title": "API Key Authentication",
                                      "description": "The attributes for API Key Authentication.",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "awsv4": {
                                      "type": "array",
                                      "title": "AWS Signature v4",
                                      "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "basic": {
                                      "type": "array",
                                      "title": "Basic Authentication",
                                      "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "bearer": {
                                      "type": "array",
                                      "title": "Bearer Token Authentication",
                                      "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "digest": {
                                      "type": "array",
                                      "title": "Digest Authentication",
                                      "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "edgegrid": {
                                      "type": "array",
                                      "title": "EdgeGrid Authentication",
                                      "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "hawk": {
                                      "type": "array",
                                      "title": "Hawk Authentication",
                                      "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "ntlm": {
                                      "type": "array",
                                      "title": "NTLM Authentication",
                                      "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "oauth1": {
                                      "type": "array",
                                      "title": "OAuth1",
                                      "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "oauth2": {
                                      "type": "array",
                                      "title": "OAuth2",
                                      "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Auth",
                                        "id": "#/definitions/auth-attribute",
                                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {},
                                          "type": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    }
                                  },
                                  "required": [
                                    "type"
                                  ]
                                }
                              ]
                            },
                            "proxy": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/proxy-config",
                              "title": "Proxy Config",
                              "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                              "type": "object",
                              "properties": {
                                "match": {
                                  "default": "http+https://*/*",
                                  "description": "The Url match for which the proxy config is defined",
                                  "type": "string"
                                },
                                "host": {
                                  "type": "string",
                                  "description": "The proxy server host"
                                },
                                "port": {
                                  "type": "integer",
                                  "minimum": 0,
                                  "default": 8080,
                                  "description": "The proxy server port"
                                },
                                "tunnel": {
                                  "description": "The tunneling details for the proxy config",
                                  "default": false,
                                  "type": "boolean"
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "When set to true, ignores this proxy configuration entity"
                                }
                              }
                            },
                            "certificate": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/certificate",
                              "title": "Certificate",
                              "description": "A representation of an ssl certificate",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "description": "A name for the certificate for user reference",
                                  "type": "string"
                                },
                                "matches": {
                                  "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "description": "An Url match pattern string"
                                  }
                                },
                                "key": {
                                  "description": "An object containing path to file containing private key, on the file system",
                                  "type": "object",
                                  "properties": {
                                    "src": {
                                      "description": "The path to file containing key for certificate, on the file system"
                                    }
                                  }
                                },
                                "cert": {
                                  "description": "An object containing path to file certificate, on the file system",
                                  "type": "object",
                                  "properties": {
                                    "src": {
                                      "description": "The path to file containing key for certificate, on the file system"
                                    }
                                  }
                                },
                                "passphrase": {
                                  "description": "The passphrase for the certificate",
                                  "type": "string"
                                }
                              }
                            },
                            "method": {
                              "anyOf": [
                                {
                                  "description": "The Standard HTTP method associated with this request.",
                                  "type": "string",
                                  "enum": [
                                    "GET",
                                    "PUT",
                                    "POST",
                                    "PATCH",
                                    "DELETE",
                                    "COPY",
                                    "HEAD",
                                    "OPTIONS",
                                    "LINK",
                                    "UNLINK",
                                    "PURGE",
                                    "LOCK",
                                    "UNLOCK",
                                    "PROPFIND",
                                    "VIEW"
                                  ]
                                },
                                {
                                  "description": "The Custom HTTP method associated with this request.",
                                  "type": "string"
                                }
                              ]
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "header": {
                              "oneOf": [
                                {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/header-list",
                                  "title": "Header List",
                                  "description": "A representation for a list of headers",
                                  "type": "array",
                                  "items": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "type": "object",
                                    "title": "Header",
                                    "id": "#/definitions/header",
                                    "description": "Represents a single HTTP Header",
                                    "properties": {
                                      "key": {
                                        "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "The value (or the RHS) of the Header is stored in this field."
                                      },
                                      "disabled": {
                                        "type": "boolean",
                                        "default": false,
                                        "description": "If set to true, the current header will not be sent with requests."
                                      },
                                      "description": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/description",
                                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                        "oneOf": [
                                          {
                                            "type": "object",
                                            "title": "Description",
                                            "properties": {
                                              "content": {
                                                "type": "string",
                                                "description": "The content of the description goes here, as a raw string."
                                              },
                                              "type": {
                                                "type": "string",
                                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                              },
                                              "version": {
                                                "description": "Description can have versions associated with it, which should be put in this property."
                                              }
                                            }
                                          },
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      }
                                    },
                                    "required": [
                                      "key",
                                      "value"
                                    ]
                                  }
                                },
                                {
                                  "type": "string"
                                }
                              ]
                            },
                            "body": {
                              "oneOf": [
                                {
                                  "type": "object",
                                  "description": "This field contains the data usually contained in the request body.",
                                  "properties": {
                                    "mode": {
                                      "description": "Postman stores the type of data associated with this request in this field.",
                                      "enum": [
                                        "raw",
                                        "urlencoded",
                                        "formdata",
                                        "file",
                                        "graphql"
                                      ]
                                    },
                                    "raw": {
                                      "type": "string"
                                    },
                                    "urlencoded": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "title": "UrlEncodedParameter",
                                        "properties": {
                                          "key": {
                                            "type": "string"
                                          },
                                          "value": {
                                            "type": "string"
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        },
                                        "required": [
                                          "key"
                                        ]
                                      }
                                    },
                                    "formdata": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "title": "FormParameter",
                                        "anyOf": [
                                          {
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {
                                                "type": "string"
                                              },
                                              "disabled": {
                                                "type": "boolean",
                                                "default": false,
                                                "description": "When set to true, prevents this form data entity from being sent."
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "text"
                                                ]
                                              },
                                              "contentType": {
                                                "type": "string",
                                                "description": "Override Content-Type header of this form data entity."
                                              },
                                              "description": {
                                                "$schema": "http://json-schema.org/draft-04/schema#",
                                                "id": "#/definitions/description",
                                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                "oneOf": [
                                                  {
                                                    "type": "object",
                                                    "title": "Description",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "description": "The content of the description goes here, as a raw string."
                                                      },
                                                      "type": {
                                                        "type": "string",
                                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                      },
                                                      "version": {
                                                        "description": "Description can have versions associated with it, which should be put in this property."
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          },
                                          {
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "src": {
                                                "oneOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  },
                                                  {
                                                    "type": "array"
                                                  }
                                                ]
                                              },
                                              "disabled": {
                                                "type": "boolean",
                                                "default": false,
                                                "description": "When set to true, prevents this form data entity from being sent."
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "file"
                                                ]
                                              },
                                              "contentType": {
                                                "type": "string",
                                                "description": "Override Content-Type header of this form data entity."
                                              },
                                              "description": {
                                                "$schema": "http://json-schema.org/draft-04/schema#",
                                                "id": "#/definitions/description",
                                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                "oneOf": [
                                                  {
                                                    "type": "object",
                                                    "title": "Description",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "description": "The content of the description goes here, as a raw string."
                                                      },
                                                      "type": {
                                                        "type": "string",
                                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                      },
                                                      "version": {
                                                        "description": "Description can have versions associated with it, which should be put in this property."
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        ]
                                      }
                                    },
                                    "file": {
                                      "type": "object",
                                      "properties": {
                                        "src": {
                                          "oneOf": [
                                            {
                                              "type": "string",
                                              "description": "Contains the name of the file to upload. _Not the path_."
                                            },
                                            {
                                              "type": "null",
                                              "description": "A null src indicates that no file has been selected as a part of the request body"
                                            }
                                          ]
                                        },
                                        "content": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "graphql": {
                                      "type": "object"
                                    },
                                    "options": {
                                      "type": "object",
                                      "description": "Additional configurations and options set for various body modes."
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "When set to true, prevents request body from being sent."
                                    }
                                  }
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            }
                          }
                        },
                        {
                          "type": "string"
                        }
                      ]
                    },
                    "responseTime": {
                      "title": "ResponseTime",
                      "oneOf": [
                        {
                          "type": "null"
                        },
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        }
                      ],
                      "description": "The time taken by the request to complete. If a number, the unit is milliseconds. If the response is manually created, this can be set to `null`."
                    },
                    "timings": {
                      "title": "Response Timings",
                      "description": "Set of timing information related to request and response in milliseconds",
                      "oneOf": [
                        {
                          "type": "object"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "header": {
                      "title": "Headers",
                      "oneOf": [
                        {
                          "type": "array",
                          "title": "Header",
                          "description": "No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.",
                          "items": {
                            "oneOf": [
                              {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "type": "object",
                                "title": "Header",
                                "id": "#/definitions/header",
                                "description": "Represents a single HTTP Header",
                                "properties": {
                                  "key": {
                                    "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string",
                                    "description": "The value (or the RHS) of the Header is stored in this field."
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "If set to true, the current header will not be sent with requests."
                                  },
                                  "description": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/description",
                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "title": "Description",
                                        "properties": {
                                          "content": {
                                            "type": "string",
                                            "description": "The content of the description goes here, as a raw string."
                                          },
                                          "type": {
                                            "type": "string",
                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                          },
                                          "version": {
                                            "description": "Description can have versions associated with it, which should be put in this property."
                                          }
                                        }
                                      },
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "key",
                                  "value"
                                ]
                              },
                              {
                                "title": "Header",
                                "type": "string"
                              }
                            ]
                          }
                        },
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "cookie": {
                      "type": "array",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Cookie",
                        "id": "#/definitions/cookie",
                        "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
                        "properties": {
                          "domain": {
                            "type": "string",
                            "description": "The domain for which this cookie is valid."
                          },
                          "expires": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "number"
                              }
                            ],
                            "description": "When the cookie expires."
                          },
                          "maxAge": {
                            "type": "string"
                          },
                          "hostOnly": {
                            "type": "boolean",
                            "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
                          },
                          "httpOnly": {
                            "type": "boolean",
                            "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
                          },
                          "name": {
                            "type": "string",
                            "description": "This is the name of the Cookie."
                          },
                          "path": {
                            "type": "string",
                            "description": "The path associated with the Cookie."
                          },
                          "secure": {
                            "type": "boolean",
                            "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
                          },
                          "session": {
                            "type": "boolean",
                            "description": "True if the cookie is a session cookie."
                          },
                          "value": {
                            "type": "string",
                            "description": "The value of the Cookie."
                          },
                          "extensions": {
                            "type": "array",
                            "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
                          }
                        },
                        "required": [
                          "domain",
                          "path"
                        ]
                      }
                    },
                    "body": {
                      "type": [
                        "null",
                        "string"
                      ],
                      "description": "The raw text of the response."
                    },
                    "status": {
                      "type": "string",
                      "description": "The response status, e.g: '200 OK'"
                    },
                    "code": {
                      "type": "integer",
                      "description": "The numerical response code, example: 200, 201, 404, etc."
                    }
                  }
                }
              },
              "protocolProfileBehavior": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Protocol Profile Behavior",
                "id": "#/definitions/protocol-profile-behavior",
                "description": "Set of configurations used to alter the usual behavior of sending the request"
              }
            },
            "required": [
              "request"
            ]
          },
          {
            "$ref": "#/definitions/item-group"
          }
        ],
        "type": "string"
      }
    },
    "event": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/event-list",
      "title": "Event List",
      "type": "array",
      "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "#/definitions/event",
        "title": "Event",
        "description": "Defines a script associated with an associated event name",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A unique identifier for the enclosing event."
          },
          "listen": {
            "type": "string",
            "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
          },
          "script": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/script",
            "title": "Script",
            "type": "object",
            "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
            "properties": {
              "id": {
                "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                "type": "string"
              },
              "type": {
                "description": "Type of the script. E.g: 'text/javascript'",
                "type": "string"
              },
              "exec": {
                "oneOf": [
                  {
                    "type": "array",
                    "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                    "items": {
                      "type": "string"
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "src": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                "id": "#/definitions/url",
                "title": "Url",
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "raw": {
                        "type": "string",
                        "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                      },
                      "protocol": {
                        "type": "string",
                        "description": "The protocol associated with the request, E.g: 'http'"
                      },
                      "host": {
                        "title": "Host",
                        "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The host, split into subdomain strings."
                          }
                        ]
                      },
                      "path": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                            "items": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      },
                      "port": {
                        "type": "string",
                        "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                      },
                      "query": {
                        "type": "array",
                        "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                        "items": {
                          "type": "object",
                          "title": "QueryParam",
                          "properties": {
                            "key": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "value": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "disabled": {
                              "type": "boolean",
                              "default": false,
                              "description": "If set to true, the current query parameter will not be sent with the request."
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            }
                          }
                        }
                      },
                      "hash": {
                        "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                        "type": "string"
                      },
                      "variable": {
                        "type": "array",
                        "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                        "items": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "id": "#/definitions/variable",
                          "title": "Variable",
                          "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                          "type": "object",
                          "properties": {
                            "id": {
                              "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                              "type": "string"
                            },
                            "key": {
                              "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                              "type": "string"
                            },
                            "value": {
                              "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                            },
                            "type": {
                              "description": "A variable may have multiple types. This field specifies the type of the variable.",
                              "type": "string",
                              "enum": [
                                "string",
                                "boolean",
                                "any",
                                "number"
                              ]
                            },
                            "name": {
                              "type": "string",
                              "description": "Variable name"
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "system": {
                              "type": "boolean",
                              "default": false,
                              "description": "When set to true, indicates that this variable has been set by Postman"
                            },
                            "disabled": {
                              "type": "boolean",
                              "default": false
                            }
                          },
                          "anyOf": [
                            {
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "required": [
                                "key"
                              ]
                            },
                            {
                              "required": [
                                "id",
                                "key"
                              ]
                            }
                          ]
                        }
                      }
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "name": {
                "type": "string",
                "description": "Script name"
              }
            }
          },
          "disabled": {
            "type": "boolean",
            "default": false,
            "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
          }
        },
        "required": [
          "listen"
        ]
      }
    },
    "variable": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/variable-list",
      "title": "Variable List",
      "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
      "type": "array",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "#/definitions/variable",
        "title": "Variable",
        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
        "type": "object",
        "properties": {
          "id": {
            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
            "type": "string"
          },
          "key": {
            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
            "type": "string"
          },
          "value": {
            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
          },
          "type": {
            "description": "A variable may have multiple types. This field specifies the type of the variable.",
            "type": "string",
            "enum": [
              "string",
              "boolean",
              "any",
              "number"
            ]
          },
          "name": {
            "type": "string",
            "description": "Variable name"
          },
          "description": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/description",
            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
            "oneOf": [
              {
                "type": "object",
                "title": "Description",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "The content of the description goes here, as a raw string."
                  },
                  "type": {
                    "type": "string",
                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                  },
                  "version": {
                    "description": "Description can have versions associated with it, which should be put in this property."
                  }
                }
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "system": {
            "type": "boolean",
            "default": false,
            "description": "When set to true, indicates that this variable has been set by Postman"
          },
          "disabled": {
            "type": "boolean",
            "default": false
          }
        },
        "anyOf": [
          {
            "required": [
              "id"
            ]
          },
          {
            "required": [
              "key"
            ]
          },
          {
            "required": [
              "id",
              "key"
            ]
          }
        ]
      }
    },
    "auth": {
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "title": "Auth",
          "id": "#/definitions/auth",
          "description": "Represents authentication helpers provided by Postman",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "apikey",
                "awsv4",
                "basic",
                "bearer",
                "digest",
                "edgegrid",
                "hawk",
                "noauth",
                "oauth1",
                "oauth2",
                "ntlm"
              ]
            },
            "noauth": {},
            "apikey": {
              "type": "array",
              "title": "API Key Authentication",
              "description": "The attributes for API Key Authentication.",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "awsv4": {
              "type": "array",
              "title": "AWS Signature v4",
              "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "basic": {
              "type": "array",
              "title": "Basic Authentication",
              "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "bearer": {
              "type": "array",
              "title": "Bearer Token Authentication",
              "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "digest": {
              "type": "array",
              "title": "Digest Authentication",
              "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "edgegrid": {
              "type": "array",
              "title": "EdgeGrid Authentication",
              "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "hawk": {
              "type": "array",
              "title": "Hawk Authentication",
              "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "ntlm": {
              "type": "array",
              "title": "NTLM Authentication",
              "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "oauth1": {
              "type": "array",
              "title": "OAuth1",
              "description": "The attributes for [OAuth2](https://oauth.net/1/)",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            },
            "oauth2": {
              "type": "array",
              "title": "OAuth2",
              "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Auth",
                "id": "#/definitions/auth-attribute",
                "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                "properties": {
                  "key": {
                    "type": "string"
                  },
                  "value": {},
                  "type": {
                    "type": "string"
                  }
                },
                "required": [
                  "key"
                ]
              }
            }
          },
          "required": [
            "type"
          ]
        }
      ]
    },
    "protocolProfileBehavior": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Protocol Profile Behavior",
      "id": "#/definitions/protocol-profile-behavior",
      "description": "Set of configurations used to alter the usual behavior of sending the request",
      "properties": {}
    }
  },
  "required": [
    "info",
    "item"
  ],
  "definitions": {
    "auth-attribute": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Auth",
      "id": "#/definitions/auth-attribute",
      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
      "properties": {
        "key": {
          "type": "string"
        },
        "value": {},
        "type": {
          "type": "string"
        }
      },
      "required": [
        "key"
      ]
    },
    "auth": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Auth",
      "id": "#/definitions/auth",
      "description": "Represents authentication helpers provided by Postman",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "apikey",
            "awsv4",
            "basic",
            "bearer",
            "digest",
            "edgegrid",
            "hawk",
            "noauth",
            "oauth1",
            "oauth2",
            "ntlm"
          ]
        },
        "noauth": {},
        "apikey": {
          "type": "array",
          "title": "API Key Authentication",
          "description": "The attributes for API Key Authentication.",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "awsv4": {
          "type": "array",
          "title": "AWS Signature v4",
          "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "basic": {
          "type": "array",
          "title": "Basic Authentication",
          "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "bearer": {
          "type": "array",
          "title": "Bearer Token Authentication",
          "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "digest": {
          "type": "array",
          "title": "Digest Authentication",
          "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "edgegrid": {
          "type": "array",
          "title": "EdgeGrid Authentication",
          "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "hawk": {
          "type": "array",
          "title": "Hawk Authentication",
          "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "ntlm": {
          "type": "array",
          "title": "NTLM Authentication",
          "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "oauth1": {
          "type": "array",
          "title": "OAuth1",
          "description": "The attributes for [OAuth2](https://oauth.net/1/)",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        },
        "oauth2": {
          "type": "array",
          "title": "OAuth2",
          "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Auth",
            "id": "#/definitions/auth-attribute",
            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
            "properties": {
              "key": {
                "type": "string"
              },
              "value": {},
              "type": {
                "type": "string"
              }
            },
            "required": [
              "key"
            ]
          }
        }
      },
      "required": [
        "type"
      ]
    },
    "certificate-list": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/certificate-list",
      "title": "Certificate List",
      "description": "A representation of a list of ssl certificates",
      "type": "array",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "#/definitions/certificate",
        "title": "Certificate",
        "description": "A representation of an ssl certificate",
        "type": "object",
        "properties": {
          "name": {
            "description": "A name for the certificate for user reference",
            "type": "string"
          },
          "matches": {
            "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
            "type": "array",
            "items": {
              "type": "string",
              "description": "An Url match pattern string"
            }
          },
          "key": {
            "description": "An object containing path to file containing private key, on the file system",
            "type": "object",
            "properties": {
              "src": {
                "description": "The path to file containing key for certificate, on the file system"
              }
            }
          },
          "cert": {
            "description": "An object containing path to file certificate, on the file system",
            "type": "object",
            "properties": {
              "src": {
                "description": "The path to file containing key for certificate, on the file system"
              }
            }
          },
          "passphrase": {
            "description": "The passphrase for the certificate",
            "type": "string"
          }
        }
      }
    },
    "certificate": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/certificate",
      "title": "Certificate",
      "description": "A representation of an ssl certificate",
      "type": "object",
      "properties": {
        "name": {
          "description": "A name for the certificate for user reference",
          "type": "string"
        },
        "matches": {
          "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
          "type": "array",
          "items": {
            "type": "string",
            "description": "An Url match pattern string"
          }
        },
        "key": {
          "description": "An object containing path to file containing private key, on the file system",
          "type": "object",
          "properties": {
            "src": {
              "description": "The path to file containing key for certificate, on the file system"
            }
          }
        },
        "cert": {
          "description": "An object containing path to file certificate, on the file system",
          "type": "object",
          "properties": {
            "src": {
              "description": "The path to file containing key for certificate, on the file system"
            }
          }
        },
        "passphrase": {
          "description": "The passphrase for the certificate",
          "type": "string"
        }
      }
    },
    "cookie-list": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/cookie-list",
      "title": "Certificate List",
      "description": "A representation of a list of cookies",
      "type": "array",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "title": "Cookie",
        "id": "#/definitions/cookie",
        "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
        "properties": {
          "domain": {
            "type": "string",
            "description": "The domain for which this cookie is valid."
          },
          "expires": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "number"
              }
            ],
            "description": "When the cookie expires."
          },
          "maxAge": {
            "type": "string"
          },
          "hostOnly": {
            "type": "boolean",
            "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
          },
          "httpOnly": {
            "type": "boolean",
            "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
          },
          "name": {
            "type": "string",
            "description": "This is the name of the Cookie."
          },
          "path": {
            "type": "string",
            "description": "The path associated with the Cookie."
          },
          "secure": {
            "type": "boolean",
            "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
          },
          "session": {
            "type": "boolean",
            "description": "True if the cookie is a session cookie."
          },
          "value": {
            "type": "string",
            "description": "The value of the Cookie."
          },
          "extensions": {
            "type": "array",
            "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
          }
        },
        "required": [
          "domain",
          "path"
        ]
      }
    },
    "cookie": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Cookie",
      "id": "#/definitions/cookie",
      "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
      "properties": {
        "domain": {
          "type": "string",
          "description": "The domain for which this cookie is valid."
        },
        "expires": {
          "oneOf": [
            {
              "type": "string"
            },
            {
              "type": "number"
            }
          ],
          "description": "When the cookie expires."
        },
        "maxAge": {
          "type": "string"
        },
        "hostOnly": {
          "type": "boolean",
          "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
        },
        "httpOnly": {
          "type": "boolean",
          "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
        },
        "name": {
          "type": "string",
          "description": "This is the name of the Cookie."
        },
        "path": {
          "type": "string",
          "description": "The path associated with the Cookie."
        },
        "secure": {
          "type": "boolean",
          "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
        },
        "session": {
          "type": "boolean",
          "description": "True if the cookie is a session cookie."
        },
        "value": {
          "type": "string",
          "description": "The value of the Cookie."
        },
        "extensions": {
          "type": "array",
          "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
        }
      },
      "required": [
        "domain",
        "path"
      ]
    },
    "description": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/description",
      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
      "oneOf": [
        {
          "type": "object",
          "title": "Description",
          "properties": {
            "content": {
              "type": "string",
              "description": "The content of the description goes here, as a raw string."
            },
            "type": {
              "type": "string",
              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
            },
            "version": {
              "description": "Description can have versions associated with it, which should be put in this property."
            }
          }
        },
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "event-list": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/event-list",
      "title": "Event List",
      "type": "array",
      "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "#/definitions/event",
        "title": "Event",
        "description": "Defines a script associated with an associated event name",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "A unique identifier for the enclosing event."
          },
          "listen": {
            "type": "string",
            "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
          },
          "script": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/script",
            "title": "Script",
            "type": "object",
            "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
            "properties": {
              "id": {
                "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                "type": "string"
              },
              "type": {
                "description": "Type of the script. E.g: 'text/javascript'",
                "type": "string"
              },
              "exec": {
                "oneOf": [
                  {
                    "type": "array",
                    "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                    "items": {
                      "type": "string"
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "src": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                "id": "#/definitions/url",
                "title": "Url",
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "raw": {
                        "type": "string",
                        "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                      },
                      "protocol": {
                        "type": "string",
                        "description": "The protocol associated with the request, E.g: 'http'"
                      },
                      "host": {
                        "title": "Host",
                        "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The host, split into subdomain strings."
                          }
                        ]
                      },
                      "path": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                            "items": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "object",
                                  "properties": {
                                    "type": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      },
                      "port": {
                        "type": "string",
                        "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                      },
                      "query": {
                        "type": "array",
                        "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                        "items": {
                          "type": "object",
                          "title": "QueryParam",
                          "properties": {
                            "key": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "value": {
                              "oneOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "disabled": {
                              "type": "boolean",
                              "default": false,
                              "description": "If set to true, the current query parameter will not be sent with the request."
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            }
                          }
                        }
                      },
                      "hash": {
                        "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                        "type": "string"
                      },
                      "variable": {
                        "type": "array",
                        "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                        "items": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "id": "#/definitions/variable",
                          "title": "Variable",
                          "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                          "type": "object",
                          "properties": {
                            "id": {
                              "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                              "type": "string"
                            },
                            "key": {
                              "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                              "type": "string"
                            },
                            "value": {
                              "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                            },
                            "type": {
                              "description": "A variable may have multiple types. This field specifies the type of the variable.",
                              "type": "string",
                              "enum": [
                                "string",
                                "boolean",
                                "any",
                                "number"
                              ]
                            },
                            "name": {
                              "type": "string",
                              "description": "Variable name"
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "system": {
                              "type": "boolean",
                              "default": false,
                              "description": "When set to true, indicates that this variable has been set by Postman"
                            },
                            "disabled": {
                              "type": "boolean",
                              "default": false
                            }
                          },
                          "anyOf": [
                            {
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "required": [
                                "key"
                              ]
                            },
                            {
                              "required": [
                                "id",
                                "key"
                              ]
                            }
                          ]
                        }
                      }
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "name": {
                "type": "string",
                "description": "Script name"
              }
            }
          },
          "disabled": {
            "type": "boolean",
            "default": false,
            "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
          }
        },
        "required": [
          "listen"
        ]
      }
    },
    "event": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/event",
      "title": "Event",
      "description": "Defines a script associated with an associated event name",
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "A unique identifier for the enclosing event."
        },
        "listen": {
          "type": "string",
          "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
        },
        "script": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/script",
          "title": "Script",
          "type": "object",
          "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
          "properties": {
            "id": {
              "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
              "type": "string"
            },
            "type": {
              "description": "Type of the script. E.g: 'text/javascript'",
              "type": "string"
            },
            "exec": {
              "oneOf": [
                {
                  "type": "array",
                  "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                  "items": {
                    "type": "string"
                  }
                },
                {
                  "type": "string"
                }
              ]
            },
            "src": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
              "id": "#/definitions/url",
              "title": "Url",
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "raw": {
                      "type": "string",
                      "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                    },
                    "protocol": {
                      "type": "string",
                      "description": "The protocol associated with the request, E.g: 'http'"
                    },
                    "host": {
                      "title": "Host",
                      "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "The host, split into subdomain strings."
                        }
                      ]
                    },
                    "path": {
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                          "items": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "type": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "port": {
                      "type": "string",
                      "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                    },
                    "query": {
                      "type": "array",
                      "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                      "items": {
                        "type": "object",
                        "title": "QueryParam",
                        "properties": {
                          "key": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "value": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "If set to true, the current query parameter will not be sent with the request."
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        }
                      }
                    },
                    "hash": {
                      "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                      "type": "string"
                    },
                    "variable": {
                      "type": "array",
                      "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/variable",
                        "title": "Variable",
                        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                        "type": "object",
                        "properties": {
                          "id": {
                            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                            "type": "string"
                          },
                          "key": {
                            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                            "type": "string"
                          },
                          "value": {
                            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                          },
                          "type": {
                            "description": "A variable may have multiple types. This field specifies the type of the variable.",
                            "type": "string",
                            "enum": [
                              "string",
                              "boolean",
                              "any",
                              "number"
                            ]
                          },
                          "name": {
                            "type": "string",
                            "description": "Variable name"
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "system": {
                            "type": "boolean",
                            "default": false,
                            "description": "When set to true, indicates that this variable has been set by Postman"
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false
                          }
                        },
                        "anyOf": [
                          {
                            "required": [
                              "id"
                            ]
                          },
                          {
                            "required": [
                              "key"
                            ]
                          },
                          {
                            "required": [
                              "id",
                              "key"
                            ]
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "string"
                }
              ]
            },
            "name": {
              "type": "string",
              "description": "Script name"
            }
          }
        },
        "disabled": {
          "type": "boolean",
          "default": false,
          "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
        }
      },
      "required": [
        "listen"
      ]
    },
    "header-list": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/header-list",
      "title": "Header List",
      "description": "A representation for a list of headers",
      "type": "array",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "title": "Header",
        "id": "#/definitions/header",
        "description": "Represents a single HTTP Header",
        "properties": {
          "key": {
            "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
            "type": "string"
          },
          "value": {
            "type": "string",
            "description": "The value (or the RHS) of the Header is stored in this field."
          },
          "disabled": {
            "type": "boolean",
            "default": false,
            "description": "If set to true, the current header will not be sent with requests."
          },
          "description": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/description",
            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
            "oneOf": [
              {
                "type": "object",
                "title": "Description",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "The content of the description goes here, as a raw string."
                  },
                  "type": {
                    "type": "string",
                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                  },
                  "version": {
                    "description": "Description can have versions associated with it, which should be put in this property."
                  }
                }
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "key",
          "value"
        ]
      }
    },
    "header": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Header",
      "id": "#/definitions/header",
      "description": "Represents a single HTTP Header",
      "properties": {
        "key": {
          "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
          "type": "string"
        },
        "value": {
          "type": "string",
          "description": "The value (or the RHS) of the Header is stored in this field."
        },
        "disabled": {
          "type": "boolean",
          "default": false,
          "description": "If set to true, the current header will not be sent with requests."
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        }
      },
      "required": [
        "key",
        "value"
      ]
    },
    "info": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/info",
      "title": "Information",
      "description": "Detailed description of the info block",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name of the collection",
          "description": "A collection's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this collection among a bunch of other collections, as such outlining its usage or content."
        },
        "_postman_id": {
          "type": "string",
          "description": "Every collection is identified by the unique value of this field. The value of this field is usually easiest to generate using a UID generator function. If you already have a collection, it is recommended that you maintain the same id since changing the id usually implies that is a different collection than it was originally.\n *Note: This field exists for compatibility reasons with Collection Format V1.*"
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "version": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/version",
          "title": "Collection Version",
          "description": "Postman allows you to version your collections as they grow, and this field holds the version number. While optional, it is recommended that you use this field to its fullest extent!",
          "oneOf": [
            {
              "type": "object",
              "properties": {
                "major": {
                  "description": "Increment this number if you make changes to the collection that changes its behaviour. E.g: Removing or adding new test scripts. (partly or completely).",
                  "minimum": 0,
                  "type": "integer"
                },
                "minor": {
                  "description": "You should increment this number if you make changes that will not break anything that uses the collection. E.g: removing a folder.",
                  "minimum": 0,
                  "type": "integer"
                },
                "patch": {
                  "description": "Ideally, minor changes to a collection should result in the increment of this number.",
                  "minimum": 0,
                  "type": "integer"
                },
                "identifier": {
                  "description": "A human friendly identifier to make sense of the version numbers. E.g: 'beta-3'",
                  "type": "string",
                  "maxLength": 10
                },
                "meta": {}
              },
              "required": [
                "major",
                "minor",
                "patch"
              ]
            },
            {
              "type": "string"
            }
          ]
        },
        "schema": {
          "description": "This should ideally hold a link to the Postman schema that is used to validate this collection. E.g: https://schema.getpostman.com/collection/v1",
          "type": "string"
        }
      },
      "required": [
        "name",
        "schema"
      ]
    },
    "item-group": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Folder",
      "id": "#/definitions/item-group",
      "description": "One of the primary goals of Postman is to organize the development of APIs. To this end, it is necessary to be able to group requests together. This can be achived using 'Folders'. A folder just is an ordered set of requests.",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "A folder's friendly name is defined by this field. You would want to set this field to a value that would allow you to easily identify this folder."
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "variable": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/variable-list",
          "title": "Variable List",
          "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
          "type": "array",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/variable",
            "title": "Variable",
            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
            "type": "object",
            "properties": {
              "id": {
                "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                "type": "string"
              },
              "key": {
                "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                "type": "string"
              },
              "value": {
                "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
              },
              "type": {
                "description": "A variable may have multiple types. This field specifies the type of the variable.",
                "type": "string",
                "enum": [
                  "string",
                  "boolean",
                  "any",
                  "number"
                ]
              },
              "name": {
                "type": "string",
                "description": "Variable name"
              },
              "description": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/description",
                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                "oneOf": [
                  {
                    "type": "object",
                    "title": "Description",
                    "properties": {
                      "content": {
                        "type": "string",
                        "description": "The content of the description goes here, as a raw string."
                      },
                      "type": {
                        "type": "string",
                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                      },
                      "version": {
                        "description": "Description can have versions associated with it, which should be put in this property."
                      }
                    }
                  },
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "system": {
                "type": "boolean",
                "default": false,
                "description": "When set to true, indicates that this variable has been set by Postman"
              },
              "disabled": {
                "type": "boolean",
                "default": false
              }
            },
            "anyOf": [
              {
                "required": [
                  "id"
                ]
              },
              {
                "required": [
                  "key"
                ]
              },
              {
                "required": [
                  "id",
                  "key"
                ]
              }
            ]
          }
        },
        "item": {
          "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it. Folders may contain many items.",
          "type": "array",
          "items": {
            "title": "Items",
            "anyOf": [
              {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Item",
                "id": "#/definitions/item",
                "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it.",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "A unique ID that is used to identify collections internally"
                  },
                  "name": {
                    "type": "string",
                    "description": "A human readable identifier for the current item."
                  },
                  "description": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/description",
                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                    "oneOf": [
                      {
                        "type": "object",
                        "title": "Description",
                        "properties": {
                          "content": {
                            "type": "string",
                            "description": "The content of the description goes here, as a raw string."
                          },
                          "type": {
                            "type": "string",
                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                          },
                          "version": {
                            "description": "Description can have versions associated with it, which should be put in this property."
                          }
                        }
                      },
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "variable": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/variable-list",
                    "title": "Variable List",
                    "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
                    "type": "array",
                    "items": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/variable",
                      "title": "Variable",
                      "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                          "type": "string"
                        },
                        "key": {
                          "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                          "type": "string"
                        },
                        "value": {
                          "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                        },
                        "type": {
                          "description": "A variable may have multiple types. This field specifies the type of the variable.",
                          "type": "string",
                          "enum": [
                            "string",
                            "boolean",
                            "any",
                            "number"
                          ]
                        },
                        "name": {
                          "type": "string",
                          "description": "Variable name"
                        },
                        "description": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "id": "#/definitions/description",
                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                          "oneOf": [
                            {
                              "type": "object",
                              "title": "Description",
                              "properties": {
                                "content": {
                                  "type": "string",
                                  "description": "The content of the description goes here, as a raw string."
                                },
                                "type": {
                                  "type": "string",
                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                },
                                "version": {
                                  "description": "Description can have versions associated with it, which should be put in this property."
                                }
                              }
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "system": {
                          "type": "boolean",
                          "default": false,
                          "description": "When set to true, indicates that this variable has been set by Postman"
                        },
                        "disabled": {
                          "type": "boolean",
                          "default": false
                        }
                      },
                      "anyOf": [
                        {
                          "required": [
                            "id"
                          ]
                        },
                        {
                          "required": [
                            "key"
                          ]
                        },
                        {
                          "required": [
                            "id",
                            "key"
                          ]
                        }
                      ]
                    }
                  },
                  "event": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/event-list",
                    "title": "Event List",
                    "type": "array",
                    "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
                    "items": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/event",
                      "title": "Event",
                      "description": "Defines a script associated with an associated event name",
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "A unique identifier for the enclosing event."
                        },
                        "listen": {
                          "type": "string",
                          "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
                        },
                        "script": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "id": "#/definitions/script",
                          "title": "Script",
                          "type": "object",
                          "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
                          "properties": {
                            "id": {
                              "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                              "type": "string"
                            },
                            "type": {
                              "description": "Type of the script. E.g: 'text/javascript'",
                              "type": "string"
                            },
                            "exec": {
                              "oneOf": [
                                {
                                  "type": "array",
                                  "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                {
                                  "type": "string"
                                }
                              ]
                            },
                            "src": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                              "id": "#/definitions/url",
                              "title": "Url",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "raw": {
                                      "type": "string",
                                      "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                                    },
                                    "protocol": {
                                      "type": "string",
                                      "description": "The protocol associated with the request, E.g: 'http'"
                                    },
                                    "host": {
                                      "title": "Host",
                                      "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          },
                                          "description": "The host, split into subdomain strings."
                                        }
                                      ]
                                    },
                                    "path": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "array",
                                          "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                          "items": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "object",
                                                "properties": {
                                                  "type": {
                                                    "type": "string"
                                                  },
                                                  "value": {
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                    },
                                    "port": {
                                      "type": "string",
                                      "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                                    },
                                    "query": {
                                      "type": "array",
                                      "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                      "items": {
                                        "type": "object",
                                        "title": "QueryParam",
                                        "properties": {
                                          "key": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "value": {
                                            "oneOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false,
                                            "description": "If set to true, the current query parameter will not be sent with the request."
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    },
                                    "hash": {
                                      "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                      "type": "string"
                                    },
                                    "variable": {
                                      "type": "array",
                                      "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/variable",
                                        "title": "Variable",
                                        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                            "type": "string"
                                          },
                                          "key": {
                                            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                            "type": "string"
                                          },
                                          "value": {
                                            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                          },
                                          "type": {
                                            "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                            "type": "string",
                                            "enum": [
                                              "string",
                                              "boolean",
                                              "any",
                                              "number"
                                            ]
                                          },
                                          "name": {
                                            "type": "string",
                                            "description": "Variable name"
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "system": {
                                            "type": "boolean",
                                            "default": false,
                                            "description": "When set to true, indicates that this variable has been set by Postman"
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false
                                          }
                                        },
                                        "anyOf": [
                                          {
                                            "required": [
                                              "id"
                                            ]
                                          },
                                          {
                                            "required": [
                                              "key"
                                            ]
                                          },
                                          {
                                            "required": [
                                              "id",
                                              "key"
                                            ]
                                          }
                                        ]
                                      }
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                }
                              ]
                            },
                            "name": {
                              "type": "string",
                              "description": "Script name"
                            }
                          }
                        },
                        "disabled": {
                          "type": "boolean",
                          "default": false,
                          "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
                        }
                      },
                      "required": [
                        "listen"
                      ]
                    }
                  },
                  "request": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/request",
                    "title": "Request",
                    "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
                    "oneOf": [
                      {
                        "type": "object",
                        "title": "Request",
                        "properties": {
                          "url": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                            "id": "#/definitions/url",
                            "title": "Url",
                            "oneOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "raw": {
                                    "type": "string",
                                    "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                                  },
                                  "protocol": {
                                    "type": "string",
                                    "description": "The protocol associated with the request, E.g: 'http'"
                                  },
                                  "host": {
                                    "title": "Host",
                                    "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                    "oneOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The host, split into subdomain strings."
                                      }
                                    ]
                                  },
                                  "path": {
                                    "oneOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "array",
                                        "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                        "items": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "object",
                                              "properties": {
                                                "type": {
                                                  "type": "string"
                                                },
                                                "value": {
                                                  "type": "string"
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                  },
                                  "port": {
                                    "type": "string",
                                    "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                                  },
                                  "query": {
                                    "type": "array",
                                    "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                    "items": {
                                      "type": "object",
                                      "title": "QueryParam",
                                      "properties": {
                                        "key": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "value": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "If set to true, the current query parameter will not be sent with the request."
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      }
                                    }
                                  },
                                  "hash": {
                                    "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                    "type": "string"
                                  },
                                  "variable": {
                                    "type": "array",
                                    "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/variable",
                                      "title": "Variable",
                                      "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                          "type": "string"
                                        },
                                        "key": {
                                          "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                          "type": "string"
                                        },
                                        "value": {
                                          "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                        },
                                        "type": {
                                          "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                          "type": "string",
                                          "enum": [
                                            "string",
                                            "boolean",
                                            "any",
                                            "number"
                                          ]
                                        },
                                        "name": {
                                          "type": "string",
                                          "description": "Variable name"
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "system": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, indicates that this variable has been set by Postman"
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false
                                        }
                                      },
                                      "anyOf": [
                                        {
                                          "required": [
                                            "id"
                                          ]
                                        },
                                        {
                                          "required": [
                                            "key"
                                          ]
                                        },
                                        {
                                          "required": [
                                            "id",
                                            "key"
                                          ]
                                        }
                                      ]
                                    }
                                  }
                                }
                              },
                              {
                                "type": "string"
                              }
                            ]
                          },
                          "auth": {
                            "oneOf": [
                              {
                                "type": "null"
                              },
                              {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "type": "object",
                                "title": "Auth",
                                "id": "#/definitions/auth",
                                "description": "Represents authentication helpers provided by Postman",
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "apikey",
                                      "awsv4",
                                      "basic",
                                      "bearer",
                                      "digest",
                                      "edgegrid",
                                      "hawk",
                                      "noauth",
                                      "oauth1",
                                      "oauth2",
                                      "ntlm"
                                    ]
                                  },
                                  "noauth": {},
                                  "apikey": {
                                    "type": "array",
                                    "title": "API Key Authentication",
                                    "description": "The attributes for API Key Authentication.",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "awsv4": {
                                    "type": "array",
                                    "title": "AWS Signature v4",
                                    "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "basic": {
                                    "type": "array",
                                    "title": "Basic Authentication",
                                    "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "bearer": {
                                    "type": "array",
                                    "title": "Bearer Token Authentication",
                                    "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "digest": {
                                    "type": "array",
                                    "title": "Digest Authentication",
                                    "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "edgegrid": {
                                    "type": "array",
                                    "title": "EdgeGrid Authentication",
                                    "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "hawk": {
                                    "type": "array",
                                    "title": "Hawk Authentication",
                                    "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "ntlm": {
                                    "type": "array",
                                    "title": "NTLM Authentication",
                                    "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "oauth1": {
                                    "type": "array",
                                    "title": "OAuth1",
                                    "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "oauth2": {
                                    "type": "array",
                                    "title": "OAuth2",
                                    "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                                    "items": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth-attribute",
                                      "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {},
                                        "type": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  }
                                },
                                "required": [
                                  "type"
                                ]
                              }
                            ]
                          },
                          "proxy": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/proxy-config",
                            "title": "Proxy Config",
                            "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                            "type": "object",
                            "properties": {
                              "match": {
                                "default": "http+https://*/*",
                                "description": "The Url match for which the proxy config is defined",
                                "type": "string"
                              },
                              "host": {
                                "type": "string",
                                "description": "The proxy server host"
                              },
                              "port": {
                                "type": "integer",
                                "minimum": 0,
                                "default": 8080,
                                "description": "The proxy server port"
                              },
                              "tunnel": {
                                "description": "The tunneling details for the proxy config",
                                "default": false,
                                "type": "boolean"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, ignores this proxy configuration entity"
                              }
                            }
                          },
                          "certificate": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/certificate",
                            "title": "Certificate",
                            "description": "A representation of an ssl certificate",
                            "type": "object",
                            "properties": {
                              "name": {
                                "description": "A name for the certificate for user reference",
                                "type": "string"
                              },
                              "matches": {
                                "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "description": "An Url match pattern string"
                                }
                              },
                              "key": {
                                "description": "An object containing path to file containing private key, on the file system",
                                "type": "object",
                                "properties": {
                                  "src": {
                                    "description": "The path to file containing key for certificate, on the file system"
                                  }
                                }
                              },
                              "cert": {
                                "description": "An object containing path to file certificate, on the file system",
                                "type": "object",
                                "properties": {
                                  "src": {
                                    "description": "The path to file containing key for certificate, on the file system"
                                  }
                                }
                              },
                              "passphrase": {
                                "description": "The passphrase for the certificate",
                                "type": "string"
                              }
                            }
                          },
                          "method": {
                            "anyOf": [
                              {
                                "description": "The Standard HTTP method associated with this request.",
                                "type": "string",
                                "enum": [
                                  "GET",
                                  "PUT",
                                  "POST",
                                  "PATCH",
                                  "DELETE",
                                  "COPY",
                                  "HEAD",
                                  "OPTIONS",
                                  "LINK",
                                  "UNLINK",
                                  "PURGE",
                                  "LOCK",
                                  "UNLOCK",
                                  "PROPFIND",
                                  "VIEW"
                                ]
                              },
                              {
                                "description": "The Custom HTTP method associated with this request.",
                                "type": "string"
                              }
                            ]
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "header": {
                            "oneOf": [
                              {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/header-list",
                                "title": "Header List",
                                "description": "A representation for a list of headers",
                                "type": "array",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Header",
                                  "id": "#/definitions/header",
                                  "description": "Represents a single HTTP Header",
                                  "properties": {
                                    "key": {
                                      "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string",
                                      "description": "The value (or the RHS) of the Header is stored in this field."
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "If set to true, the current header will not be sent with requests."
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    }
                                  },
                                  "required": [
                                    "key",
                                    "value"
                                  ]
                                }
                              },
                              {
                                "type": "string"
                              }
                            ]
                          },
                          "body": {
                            "oneOf": [
                              {
                                "type": "object",
                                "description": "This field contains the data usually contained in the request body.",
                                "properties": {
                                  "mode": {
                                    "description": "Postman stores the type of data associated with this request in this field.",
                                    "enum": [
                                      "raw",
                                      "urlencoded",
                                      "formdata",
                                      "file",
                                      "graphql"
                                    ]
                                  },
                                  "raw": {
                                    "type": "string"
                                  },
                                  "urlencoded": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "title": "UrlEncodedParameter",
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {
                                          "type": "string"
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  },
                                  "formdata": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "title": "FormParameter",
                                      "anyOf": [
                                        {
                                          "properties": {
                                            "key": {
                                              "type": "string"
                                            },
                                            "value": {
                                              "type": "string"
                                            },
                                            "disabled": {
                                              "type": "boolean",
                                              "default": false,
                                              "description": "When set to true, prevents this form data entity from being sent."
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "text"
                                              ]
                                            },
                                            "contentType": {
                                              "type": "string",
                                              "description": "Override Content-Type header of this form data entity."
                                            },
                                            "description": {
                                              "$schema": "http://json-schema.org/draft-04/schema#",
                                              "id": "#/definitions/description",
                                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                              "oneOf": [
                                                {
                                                  "type": "object",
                                                  "title": "Description",
                                                  "properties": {
                                                    "content": {
                                                      "type": "string",
                                                      "description": "The content of the description goes here, as a raw string."
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                    },
                                                    "version": {
                                                      "description": "Description can have versions associated with it, which should be put in this property."
                                                    }
                                                  }
                                                },
                                                {
                                                  "type": "string"
                                                },
                                                {
                                                  "type": "null"
                                                }
                                              ]
                                            }
                                          },
                                          "required": [
                                            "key"
                                          ]
                                        },
                                        {
                                          "properties": {
                                            "key": {
                                              "type": "string"
                                            },
                                            "src": {
                                              "oneOf": [
                                                {
                                                  "type": "string"
                                                },
                                                {
                                                  "type": "null"
                                                },
                                                {
                                                  "type": "array"
                                                }
                                              ]
                                            },
                                            "disabled": {
                                              "type": "boolean",
                                              "default": false,
                                              "description": "When set to true, prevents this form data entity from being sent."
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "file"
                                              ]
                                            },
                                            "contentType": {
                                              "type": "string",
                                              "description": "Override Content-Type header of this form data entity."
                                            },
                                            "description": {
                                              "$schema": "http://json-schema.org/draft-04/schema#",
                                              "id": "#/definitions/description",
                                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                              "oneOf": [
                                                {
                                                  "type": "object",
                                                  "title": "Description",
                                                  "properties": {
                                                    "content": {
                                                      "type": "string",
                                                      "description": "The content of the description goes here, as a raw string."
                                                    },
                                                    "type": {
                                                      "type": "string",
                                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                    },
                                                    "version": {
                                                      "description": "Description can have versions associated with it, which should be put in this property."
                                                    }
                                                  }
                                                },
                                                {
                                                  "type": "string"
                                                },
                                                {
                                                  "type": "null"
                                                }
                                              ]
                                            }
                                          },
                                          "required": [
                                            "key"
                                          ]
                                        }
                                      ]
                                    }
                                  },
                                  "file": {
                                    "type": "object",
                                    "properties": {
                                      "src": {
                                        "oneOf": [
                                          {
                                            "type": "string",
                                            "description": "Contains the name of the file to upload. _Not the path_."
                                          },
                                          {
                                            "type": "null",
                                            "description": "A null src indicates that no file has been selected as a part of the request body"
                                          }
                                        ]
                                      },
                                      "content": {
                                        "type": "string"
                                      }
                                    }
                                  },
                                  "graphql": {
                                    "type": "object"
                                  },
                                  "options": {
                                    "type": "object",
                                    "description": "Additional configurations and options set for various body modes."
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "When set to true, prevents request body from being sent."
                                  }
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        }
                      },
                      {
                        "type": "string"
                      }
                    ]
                  },
                  "response": {
                    "type": "array",
                    "title": "Responses",
                    "items": {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/response",
                      "title": "Response",
                      "description": "A response represents an HTTP response.",
                      "properties": {
                        "id": {
                          "description": "A unique, user defined identifier that can  be used to refer to this response from requests.",
                          "type": "string"
                        },
                        "originalRequest": {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "id": "#/definitions/request",
                          "title": "Request",
                          "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
                          "oneOf": [
                            {
                              "type": "object",
                              "title": "Request",
                              "properties": {
                                "url": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                                  "id": "#/definitions/url",
                                  "title": "Url",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "raw": {
                                          "type": "string",
                                          "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                                        },
                                        "protocol": {
                                          "type": "string",
                                          "description": "The protocol associated with the request, E.g: 'http'"
                                        },
                                        "host": {
                                          "title": "Host",
                                          "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "array",
                                              "items": {
                                                "type": "string"
                                              },
                                              "description": "The host, split into subdomain strings."
                                            }
                                          ]
                                        },
                                        "path": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "array",
                                              "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                              "items": {
                                                "oneOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "object",
                                                    "properties": {
                                                      "type": {
                                                        "type": "string"
                                                      },
                                                      "value": {
                                                        "type": "string"
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            }
                                          ]
                                        },
                                        "port": {
                                          "type": "string",
                                          "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                                        },
                                        "query": {
                                          "type": "array",
                                          "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                          "items": {
                                            "type": "object",
                                            "title": "QueryParam",
                                            "properties": {
                                              "key": {
                                                "oneOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "value": {
                                                "oneOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "disabled": {
                                                "type": "boolean",
                                                "default": false,
                                                "description": "If set to true, the current query parameter will not be sent with the request."
                                              },
                                              "description": {
                                                "$schema": "http://json-schema.org/draft-04/schema#",
                                                "id": "#/definitions/description",
                                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                "oneOf": [
                                                  {
                                                    "type": "object",
                                                    "title": "Description",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "description": "The content of the description goes here, as a raw string."
                                                      },
                                                      "type": {
                                                        "type": "string",
                                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                      },
                                                      "version": {
                                                        "description": "Description can have versions associated with it, which should be put in this property."
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              }
                                            }
                                          }
                                        },
                                        "hash": {
                                          "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                          "type": "string"
                                        },
                                        "variable": {
                                          "type": "array",
                                          "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/variable",
                                            "title": "Variable",
                                            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                            "type": "object",
                                            "properties": {
                                              "id": {
                                                "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                                "type": "string"
                                              },
                                              "key": {
                                                "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                                "type": "string"
                                              },
                                              "value": {
                                                "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                              },
                                              "type": {
                                                "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                                "type": "string",
                                                "enum": [
                                                  "string",
                                                  "boolean",
                                                  "any",
                                                  "number"
                                                ]
                                              },
                                              "name": {
                                                "type": "string",
                                                "description": "Variable name"
                                              },
                                              "description": {
                                                "$schema": "http://json-schema.org/draft-04/schema#",
                                                "id": "#/definitions/description",
                                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                "oneOf": [
                                                  {
                                                    "type": "object",
                                                    "title": "Description",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "description": "The content of the description goes here, as a raw string."
                                                      },
                                                      "type": {
                                                        "type": "string",
                                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                      },
                                                      "version": {
                                                        "description": "Description can have versions associated with it, which should be put in this property."
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "system": {
                                                "type": "boolean",
                                                "default": false,
                                                "description": "When set to true, indicates that this variable has been set by Postman"
                                              },
                                              "disabled": {
                                                "type": "boolean",
                                                "default": false
                                              }
                                            },
                                            "anyOf": [
                                              {
                                                "required": [
                                                  "id"
                                                ]
                                              },
                                              {
                                                "required": [
                                                  "key"
                                                ]
                                              },
                                              {
                                                "required": [
                                                  "id",
                                                  "key"
                                                ]
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    }
                                  ]
                                },
                                "auth": {
                                  "oneOf": [
                                    {
                                      "type": "null"
                                    },
                                    {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "type": "object",
                                      "title": "Auth",
                                      "id": "#/definitions/auth",
                                      "description": "Represents authentication helpers provided by Postman",
                                      "properties": {
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "apikey",
                                            "awsv4",
                                            "basic",
                                            "bearer",
                                            "digest",
                                            "edgegrid",
                                            "hawk",
                                            "noauth",
                                            "oauth1",
                                            "oauth2",
                                            "ntlm"
                                          ]
                                        },
                                        "noauth": {},
                                        "apikey": {
                                          "type": "array",
                                          "title": "API Key Authentication",
                                          "description": "The attributes for API Key Authentication.",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "awsv4": {
                                          "type": "array",
                                          "title": "AWS Signature v4",
                                          "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "basic": {
                                          "type": "array",
                                          "title": "Basic Authentication",
                                          "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "bearer": {
                                          "type": "array",
                                          "title": "Bearer Token Authentication",
                                          "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "digest": {
                                          "type": "array",
                                          "title": "Digest Authentication",
                                          "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "edgegrid": {
                                          "type": "array",
                                          "title": "EdgeGrid Authentication",
                                          "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "hawk": {
                                          "type": "array",
                                          "title": "Hawk Authentication",
                                          "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "ntlm": {
                                          "type": "array",
                                          "title": "NTLM Authentication",
                                          "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "oauth1": {
                                          "type": "array",
                                          "title": "OAuth1",
                                          "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "oauth2": {
                                          "type": "array",
                                          "title": "OAuth2",
                                          "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                                          "items": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "type": "object",
                                            "title": "Auth",
                                            "id": "#/definitions/auth-attribute",
                                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {},
                                              "type": {
                                                "type": "string"
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        }
                                      },
                                      "required": [
                                        "type"
                                      ]
                                    }
                                  ]
                                },
                                "proxy": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/proxy-config",
                                  "title": "Proxy Config",
                                  "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                                  "type": "object",
                                  "properties": {
                                    "match": {
                                      "default": "http+https://*/*",
                                      "description": "The Url match for which the proxy config is defined",
                                      "type": "string"
                                    },
                                    "host": {
                                      "type": "string",
                                      "description": "The proxy server host"
                                    },
                                    "port": {
                                      "type": "integer",
                                      "minimum": 0,
                                      "default": 8080,
                                      "description": "The proxy server port"
                                    },
                                    "tunnel": {
                                      "description": "The tunneling details for the proxy config",
                                      "default": false,
                                      "type": "boolean"
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "When set to true, ignores this proxy configuration entity"
                                    }
                                  }
                                },
                                "certificate": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/certificate",
                                  "title": "Certificate",
                                  "description": "A representation of an ssl certificate",
                                  "type": "object",
                                  "properties": {
                                    "name": {
                                      "description": "A name for the certificate for user reference",
                                      "type": "string"
                                    },
                                    "matches": {
                                      "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                                      "type": "array",
                                      "items": {
                                        "type": "string",
                                        "description": "An Url match pattern string"
                                      }
                                    },
                                    "key": {
                                      "description": "An object containing path to file containing private key, on the file system",
                                      "type": "object",
                                      "properties": {
                                        "src": {
                                          "description": "The path to file containing key for certificate, on the file system"
                                        }
                                      }
                                    },
                                    "cert": {
                                      "description": "An object containing path to file certificate, on the file system",
                                      "type": "object",
                                      "properties": {
                                        "src": {
                                          "description": "The path to file containing key for certificate, on the file system"
                                        }
                                      }
                                    },
                                    "passphrase": {
                                      "description": "The passphrase for the certificate",
                                      "type": "string"
                                    }
                                  }
                                },
                                "method": {
                                  "anyOf": [
                                    {
                                      "description": "The Standard HTTP method associated with this request.",
                                      "type": "string",
                                      "enum": [
                                        "GET",
                                        "PUT",
                                        "POST",
                                        "PATCH",
                                        "DELETE",
                                        "COPY",
                                        "HEAD",
                                        "OPTIONS",
                                        "LINK",
                                        "UNLINK",
                                        "PURGE",
                                        "LOCK",
                                        "UNLOCK",
                                        "PROPFIND",
                                        "VIEW"
                                      ]
                                    },
                                    {
                                      "description": "The Custom HTTP method associated with this request.",
                                      "type": "string"
                                    }
                                  ]
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "header": {
                                  "oneOf": [
                                    {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/header-list",
                                      "title": "Header List",
                                      "description": "A representation for a list of headers",
                                      "type": "array",
                                      "items": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "type": "object",
                                        "title": "Header",
                                        "id": "#/definitions/header",
                                        "description": "Represents a single HTTP Header",
                                        "properties": {
                                          "key": {
                                            "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                            "type": "string"
                                          },
                                          "value": {
                                            "type": "string",
                                            "description": "The value (or the RHS) of the Header is stored in this field."
                                          },
                                          "disabled": {
                                            "type": "boolean",
                                            "default": false,
                                            "description": "If set to true, the current header will not be sent with requests."
                                          },
                                          "description": {
                                            "$schema": "http://json-schema.org/draft-04/schema#",
                                            "id": "#/definitions/description",
                                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                            "oneOf": [
                                              {
                                                "type": "object",
                                                "title": "Description",
                                                "properties": {
                                                  "content": {
                                                    "type": "string",
                                                    "description": "The content of the description goes here, as a raw string."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                  },
                                                  "version": {
                                                    "description": "Description can have versions associated with it, which should be put in this property."
                                                  }
                                                }
                                              },
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        },
                                        "required": [
                                          "key",
                                          "value"
                                        ]
                                      }
                                    },
                                    {
                                      "type": "string"
                                    }
                                  ]
                                },
                                "body": {
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "description": "This field contains the data usually contained in the request body.",
                                      "properties": {
                                        "mode": {
                                          "description": "Postman stores the type of data associated with this request in this field.",
                                          "enum": [
                                            "raw",
                                            "urlencoded",
                                            "formdata",
                                            "file",
                                            "graphql"
                                          ]
                                        },
                                        "raw": {
                                          "type": "string"
                                        },
                                        "urlencoded": {
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "title": "UrlEncodedParameter",
                                            "properties": {
                                              "key": {
                                                "type": "string"
                                              },
                                              "value": {
                                                "type": "string"
                                              },
                                              "disabled": {
                                                "type": "boolean",
                                                "default": false
                                              },
                                              "description": {
                                                "$schema": "http://json-schema.org/draft-04/schema#",
                                                "id": "#/definitions/description",
                                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                "oneOf": [
                                                  {
                                                    "type": "object",
                                                    "title": "Description",
                                                    "properties": {
                                                      "content": {
                                                        "type": "string",
                                                        "description": "The content of the description goes here, as a raw string."
                                                      },
                                                      "type": {
                                                        "type": "string",
                                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                      },
                                                      "version": {
                                                        "description": "Description can have versions associated with it, which should be put in this property."
                                                      }
                                                    }
                                                  },
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              }
                                            },
                                            "required": [
                                              "key"
                                            ]
                                          }
                                        },
                                        "formdata": {
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "title": "FormParameter",
                                            "anyOf": [
                                              {
                                                "properties": {
                                                  "key": {
                                                    "type": "string"
                                                  },
                                                  "value": {
                                                    "type": "string"
                                                  },
                                                  "disabled": {
                                                    "type": "boolean",
                                                    "default": false,
                                                    "description": "When set to true, prevents this form data entity from being sent."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "enum": [
                                                      "text"
                                                    ]
                                                  },
                                                  "contentType": {
                                                    "type": "string",
                                                    "description": "Override Content-Type header of this form data entity."
                                                  },
                                                  "description": {
                                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                                    "id": "#/definitions/description",
                                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                    "oneOf": [
                                                      {
                                                        "type": "object",
                                                        "title": "Description",
                                                        "properties": {
                                                          "content": {
                                                            "type": "string",
                                                            "description": "The content of the description goes here, as a raw string."
                                                          },
                                                          "type": {
                                                            "type": "string",
                                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                          },
                                                          "version": {
                                                            "description": "Description can have versions associated with it, which should be put in this property."
                                                          }
                                                        }
                                                      },
                                                      {
                                                        "type": "string"
                                                      },
                                                      {
                                                        "type": "null"
                                                      }
                                                    ]
                                                  }
                                                },
                                                "required": [
                                                  "key"
                                                ]
                                              },
                                              {
                                                "properties": {
                                                  "key": {
                                                    "type": "string"
                                                  },
                                                  "src": {
                                                    "oneOf": [
                                                      {
                                                        "type": "string"
                                                      },
                                                      {
                                                        "type": "null"
                                                      },
                                                      {
                                                        "type": "array"
                                                      }
                                                    ]
                                                  },
                                                  "disabled": {
                                                    "type": "boolean",
                                                    "default": false,
                                                    "description": "When set to true, prevents this form data entity from being sent."
                                                  },
                                                  "type": {
                                                    "type": "string",
                                                    "enum": [
                                                      "file"
                                                    ]
                                                  },
                                                  "contentType": {
                                                    "type": "string",
                                                    "description": "Override Content-Type header of this form data entity."
                                                  },
                                                  "description": {
                                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                                    "id": "#/definitions/description",
                                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                                    "oneOf": [
                                                      {
                                                        "type": "object",
                                                        "title": "Description",
                                                        "properties": {
                                                          "content": {
                                                            "type": "string",
                                                            "description": "The content of the description goes here, as a raw string."
                                                          },
                                                          "type": {
                                                            "type": "string",
                                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                          },
                                                          "version": {
                                                            "description": "Description can have versions associated with it, which should be put in this property."
                                                          }
                                                        }
                                                      },
                                                      {
                                                        "type": "string"
                                                      },
                                                      {
                                                        "type": "null"
                                                      }
                                                    ]
                                                  }
                                                },
                                                "required": [
                                                  "key"
                                                ]
                                              }
                                            ]
                                          }
                                        },
                                        "file": {
                                          "type": "object",
                                          "properties": {
                                            "src": {
                                              "oneOf": [
                                                {
                                                  "type": "string",
                                                  "description": "Contains the name of the file to upload. _Not the path_."
                                                },
                                                {
                                                  "type": "null",
                                                  "description": "A null src indicates that no file has been selected as a part of the request body"
                                                }
                                              ]
                                            },
                                            "content": {
                                              "type": "string"
                                            }
                                          }
                                        },
                                        "graphql": {
                                          "type": "object"
                                        },
                                        "options": {
                                          "type": "object",
                                          "description": "Additional configurations and options set for various body modes."
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, prevents request body from being sent."
                                        }
                                      }
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "type": "string"
                            }
                          ]
                        },
                        "responseTime": {
                          "title": "ResponseTime",
                          "oneOf": [
                            {
                              "type": "null"
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "number"
                            }
                          ],
                          "description": "The time taken by the request to complete. If a number, the unit is milliseconds. If the response is manually created, this can be set to `null`."
                        },
                        "timings": {
                          "title": "Response Timings",
                          "description": "Set of timing information related to request and response in milliseconds",
                          "oneOf": [
                            {
                              "type": "object"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "header": {
                          "title": "Headers",
                          "oneOf": [
                            {
                              "type": "array",
                              "title": "Header",
                              "description": "No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.",
                              "items": {
                                "oneOf": [
                                  {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "type": "object",
                                    "title": "Header",
                                    "id": "#/definitions/header",
                                    "description": "Represents a single HTTP Header",
                                    "properties": {
                                      "key": {
                                        "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "The value (or the RHS) of the Header is stored in this field."
                                      },
                                      "disabled": {
                                        "type": "boolean",
                                        "default": false,
                                        "description": "If set to true, the current header will not be sent with requests."
                                      },
                                      "description": {
                                        "$schema": "http://json-schema.org/draft-04/schema#",
                                        "id": "#/definitions/description",
                                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                        "oneOf": [
                                          {
                                            "type": "object",
                                            "title": "Description",
                                            "properties": {
                                              "content": {
                                                "type": "string",
                                                "description": "The content of the description goes here, as a raw string."
                                              },
                                              "type": {
                                                "type": "string",
                                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                              },
                                              "version": {
                                                "description": "Description can have versions associated with it, which should be put in this property."
                                              }
                                            }
                                          },
                                          {
                                            "type": "string"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      }
                                    },
                                    "required": [
                                      "key",
                                      "value"
                                    ]
                                  },
                                  {
                                    "title": "Header",
                                    "type": "string"
                                  }
                                ]
                              }
                            },
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "cookie": {
                          "type": "array",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Cookie",
                            "id": "#/definitions/cookie",
                            "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
                            "properties": {
                              "domain": {
                                "type": "string",
                                "description": "The domain for which this cookie is valid."
                              },
                              "expires": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "number"
                                  }
                                ],
                                "description": "When the cookie expires."
                              },
                              "maxAge": {
                                "type": "string"
                              },
                              "hostOnly": {
                                "type": "boolean",
                                "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
                              },
                              "httpOnly": {
                                "type": "boolean",
                                "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
                              },
                              "name": {
                                "type": "string",
                                "description": "This is the name of the Cookie."
                              },
                              "path": {
                                "type": "string",
                                "description": "The path associated with the Cookie."
                              },
                              "secure": {
                                "type": "boolean",
                                "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
                              },
                              "session": {
                                "type": "boolean",
                                "description": "True if the cookie is a session cookie."
                              },
                              "value": {
                                "type": "string",
                                "description": "The value of the Cookie."
                              },
                              "extensions": {
                                "type": "array",
                                "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
                              }
                            },
                            "required": [
                              "domain",
                              "path"
                            ]
                          }
                        },
                        "body": {
                          "type": [
                            "null",
                            "string"
                          ],
                          "description": "The raw text of the response."
                        },
                        "status": {
                          "type": "string",
                          "description": "The response status, e.g: '200 OK'"
                        },
                        "code": {
                          "type": "integer",
                          "description": "The numerical response code, example: 200, 201, 404, etc."
                        }
                      }
                    }
                  },
                  "protocolProfileBehavior": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Protocol Profile Behavior",
                    "id": "#/definitions/protocol-profile-behavior",
                    "description": "Set of configurations used to alter the usual behavior of sending the request"
                  }
                },
                "required": [
                  "request"
                ]
              },
              {
                "$ref": "#/definitions/item-group"
              }
            ]
          }
        },
        "event": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/event-list",
          "title": "Event List",
          "type": "array",
          "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/event",
            "title": "Event",
            "description": "Defines a script associated with an associated event name",
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "A unique identifier for the enclosing event."
              },
              "listen": {
                "type": "string",
                "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
              },
              "script": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/script",
                "title": "Script",
                "type": "object",
                "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
                "properties": {
                  "id": {
                    "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                    "type": "string"
                  },
                  "type": {
                    "description": "Type of the script. E.g: 'text/javascript'",
                    "type": "string"
                  },
                  "exec": {
                    "oneOf": [
                      {
                        "type": "array",
                        "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                        "items": {
                          "type": "string"
                        }
                      },
                      {
                        "type": "string"
                      }
                    ]
                  },
                  "src": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                    "id": "#/definitions/url",
                    "title": "Url",
                    "oneOf": [
                      {
                        "type": "object",
                        "properties": {
                          "raw": {
                            "type": "string",
                            "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                          },
                          "protocol": {
                            "type": "string",
                            "description": "The protocol associated with the request, E.g: 'http'"
                          },
                          "host": {
                            "title": "Host",
                            "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "The host, split into subdomain strings."
                              }
                            ]
                          },
                          "path": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "array",
                                "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                "items": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "object",
                                      "properties": {
                                        "type": {
                                          "type": "string"
                                        },
                                        "value": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          },
                          "port": {
                            "type": "string",
                            "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                          },
                          "query": {
                            "type": "array",
                            "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                            "items": {
                              "type": "object",
                              "title": "QueryParam",
                              "properties": {
                                "key": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "value": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "If set to true, the current query parameter will not be sent with the request."
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              }
                            }
                          },
                          "hash": {
                            "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                            "type": "string"
                          },
                          "variable": {
                            "type": "array",
                            "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                            "items": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/variable",
                              "title": "Variable",
                              "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                  "type": "string"
                                },
                                "key": {
                                  "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                  "type": "string"
                                },
                                "value": {
                                  "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                },
                                "type": {
                                  "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                  "type": "string",
                                  "enum": [
                                    "string",
                                    "boolean",
                                    "any",
                                    "number"
                                  ]
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Variable name"
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "system": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "When set to true, indicates that this variable has been set by Postman"
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false
                                }
                              },
                              "anyOf": [
                                {
                                  "required": [
                                    "id"
                                  ]
                                },
                                {
                                  "required": [
                                    "key"
                                  ]
                                },
                                {
                                  "required": [
                                    "id",
                                    "key"
                                  ]
                                }
                              ]
                            }
                          }
                        }
                      },
                      {
                        "type": "string"
                      }
                    ]
                  },
                  "name": {
                    "type": "string",
                    "description": "Script name"
                  }
                }
              },
              "disabled": {
                "type": "boolean",
                "default": false,
                "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
              }
            },
            "required": [
              "listen"
            ]
          }
        },
        "auth": {
          "oneOf": [
            {
              "type": "null"
            },
            {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "type": "object",
              "title": "Auth",
              "id": "#/definitions/auth",
              "description": "Represents authentication helpers provided by Postman",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "apikey",
                    "awsv4",
                    "basic",
                    "bearer",
                    "digest",
                    "edgegrid",
                    "hawk",
                    "noauth",
                    "oauth1",
                    "oauth2",
                    "ntlm"
                  ]
                },
                "noauth": {},
                "apikey": {
                  "type": "array",
                  "title": "API Key Authentication",
                  "description": "The attributes for API Key Authentication.",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "awsv4": {
                  "type": "array",
                  "title": "AWS Signature v4",
                  "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "basic": {
                  "type": "array",
                  "title": "Basic Authentication",
                  "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "bearer": {
                  "type": "array",
                  "title": "Bearer Token Authentication",
                  "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "digest": {
                  "type": "array",
                  "title": "Digest Authentication",
                  "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "edgegrid": {
                  "type": "array",
                  "title": "EdgeGrid Authentication",
                  "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "hawk": {
                  "type": "array",
                  "title": "Hawk Authentication",
                  "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "ntlm": {
                  "type": "array",
                  "title": "NTLM Authentication",
                  "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "oauth1": {
                  "type": "array",
                  "title": "OAuth1",
                  "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                },
                "oauth2": {
                  "type": "array",
                  "title": "OAuth2",
                  "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Auth",
                    "id": "#/definitions/auth-attribute",
                    "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {},
                      "type": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "key"
                    ]
                  }
                }
              },
              "required": [
                "type"
              ]
            }
          ]
        },
        "protocolProfileBehavior": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "title": "Protocol Profile Behavior",
          "id": "#/definitions/protocol-profile-behavior",
          "description": "Set of configurations used to alter the usual behavior of sending the request"
        }
      },
      "required": [
        "item"
      ]
    },
    "item": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Item",
      "id": "#/definitions/item",
      "description": "Items are entities which contain an actual HTTP request, and sample responses attached to it.",
      "properties": {
        "id": {
          "type": "string",
          "description": "A unique ID that is used to identify collections internally"
        },
        "name": {
          "type": "string",
          "description": "A human readable identifier for the current item."
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "variable": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/variable-list",
          "title": "Variable List",
          "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
          "type": "array",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/variable",
            "title": "Variable",
            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
            "type": "object",
            "properties": {
              "id": {
                "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                "type": "string"
              },
              "key": {
                "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                "type": "string"
              },
              "value": {
                "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
              },
              "type": {
                "description": "A variable may have multiple types. This field specifies the type of the variable.",
                "type": "string",
                "enum": [
                  "string",
                  "boolean",
                  "any",
                  "number"
                ]
              },
              "name": {
                "type": "string",
                "description": "Variable name"
              },
              "description": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/description",
                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                "oneOf": [
                  {
                    "type": "object",
                    "title": "Description",
                    "properties": {
                      "content": {
                        "type": "string",
                        "description": "The content of the description goes here, as a raw string."
                      },
                      "type": {
                        "type": "string",
                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                      },
                      "version": {
                        "description": "Description can have versions associated with it, which should be put in this property."
                      }
                    }
                  },
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "system": {
                "type": "boolean",
                "default": false,
                "description": "When set to true, indicates that this variable has been set by Postman"
              },
              "disabled": {
                "type": "boolean",
                "default": false
              }
            },
            "anyOf": [
              {
                "required": [
                  "id"
                ]
              },
              {
                "required": [
                  "key"
                ]
              },
              {
                "required": [
                  "id",
                  "key"
                ]
              }
            ]
          }
        },
        "event": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/event-list",
          "title": "Event List",
          "type": "array",
          "description": "Postman allows you to configure scripts to run when specific events occur. These scripts are stored here, and can be referenced in the collection by their ID.",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/event",
            "title": "Event",
            "description": "Defines a script associated with an associated event name",
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "A unique identifier for the enclosing event."
              },
              "listen": {
                "type": "string",
                "description": "Can be set to `test` or `prerequest` for test scripts or pre-request scripts respectively."
              },
              "script": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/script",
                "title": "Script",
                "type": "object",
                "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
                "properties": {
                  "id": {
                    "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
                    "type": "string"
                  },
                  "type": {
                    "description": "Type of the script. E.g: 'text/javascript'",
                    "type": "string"
                  },
                  "exec": {
                    "oneOf": [
                      {
                        "type": "array",
                        "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
                        "items": {
                          "type": "string"
                        }
                      },
                      {
                        "type": "string"
                      }
                    ]
                  },
                  "src": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                    "id": "#/definitions/url",
                    "title": "Url",
                    "oneOf": [
                      {
                        "type": "object",
                        "properties": {
                          "raw": {
                            "type": "string",
                            "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                          },
                          "protocol": {
                            "type": "string",
                            "description": "The protocol associated with the request, E.g: 'http'"
                          },
                          "host": {
                            "title": "Host",
                            "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "The host, split into subdomain strings."
                              }
                            ]
                          },
                          "path": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "array",
                                "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                "items": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "object",
                                      "properties": {
                                        "type": {
                                          "type": "string"
                                        },
                                        "value": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            ]
                          },
                          "port": {
                            "type": "string",
                            "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                          },
                          "query": {
                            "type": "array",
                            "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                            "items": {
                              "type": "object",
                              "title": "QueryParam",
                              "properties": {
                                "key": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "value": {
                                  "oneOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "If set to true, the current query parameter will not be sent with the request."
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              }
                            }
                          },
                          "hash": {
                            "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                            "type": "string"
                          },
                          "variable": {
                            "type": "array",
                            "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                            "items": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/variable",
                              "title": "Variable",
                              "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                  "type": "string"
                                },
                                "key": {
                                  "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                  "type": "string"
                                },
                                "value": {
                                  "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                },
                                "type": {
                                  "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                  "type": "string",
                                  "enum": [
                                    "string",
                                    "boolean",
                                    "any",
                                    "number"
                                  ]
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Variable name"
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "system": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "When set to true, indicates that this variable has been set by Postman"
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false
                                }
                              },
                              "anyOf": [
                                {
                                  "required": [
                                    "id"
                                  ]
                                },
                                {
                                  "required": [
                                    "key"
                                  ]
                                },
                                {
                                  "required": [
                                    "id",
                                    "key"
                                  ]
                                }
                              ]
                            }
                          }
                        }
                      },
                      {
                        "type": "string"
                      }
                    ]
                  },
                  "name": {
                    "type": "string",
                    "description": "Script name"
                  }
                }
              },
              "disabled": {
                "type": "boolean",
                "default": false,
                "description": "Indicates whether the event is disabled. If absent, the event is assumed to be enabled."
              }
            },
            "required": [
              "listen"
            ]
          }
        },
        "request": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/request",
          "title": "Request",
          "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
          "oneOf": [
            {
              "type": "object",
              "title": "Request",
              "properties": {
                "url": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                  "id": "#/definitions/url",
                  "title": "Url",
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "raw": {
                          "type": "string",
                          "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                        },
                        "protocol": {
                          "type": "string",
                          "description": "The protocol associated with the request, E.g: 'http'"
                        },
                        "host": {
                          "title": "Host",
                          "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                          "oneOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The host, split into subdomain strings."
                            }
                          ]
                        },
                        "path": {
                          "oneOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "array",
                              "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                              "items": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        },
                        "port": {
                          "type": "string",
                          "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                        },
                        "query": {
                          "type": "array",
                          "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                          "items": {
                            "type": "object",
                            "title": "QueryParam",
                            "properties": {
                              "key": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "value": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "If set to true, the current query parameter will not be sent with the request."
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            }
                          }
                        },
                        "hash": {
                          "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                          "type": "string"
                        },
                        "variable": {
                          "type": "array",
                          "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/variable",
                            "title": "Variable",
                            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                            "type": "object",
                            "properties": {
                              "id": {
                                "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                "type": "string"
                              },
                              "key": {
                                "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                "type": "string"
                              },
                              "value": {
                                "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                              },
                              "type": {
                                "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                "type": "string",
                                "enum": [
                                  "string",
                                  "boolean",
                                  "any",
                                  "number"
                                ]
                              },
                              "name": {
                                "type": "string",
                                "description": "Variable name"
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "system": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, indicates that this variable has been set by Postman"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false
                              }
                            },
                            "anyOf": [
                              {
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "required": [
                                  "key"
                                ]
                              },
                              {
                                "required": [
                                  "id",
                                  "key"
                                ]
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "auth": {
                  "oneOf": [
                    {
                      "type": "null"
                    },
                    {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "type": "object",
                      "title": "Auth",
                      "id": "#/definitions/auth",
                      "description": "Represents authentication helpers provided by Postman",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "apikey",
                            "awsv4",
                            "basic",
                            "bearer",
                            "digest",
                            "edgegrid",
                            "hawk",
                            "noauth",
                            "oauth1",
                            "oauth2",
                            "ntlm"
                          ]
                        },
                        "noauth": {},
                        "apikey": {
                          "type": "array",
                          "title": "API Key Authentication",
                          "description": "The attributes for API Key Authentication.",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "awsv4": {
                          "type": "array",
                          "title": "AWS Signature v4",
                          "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "basic": {
                          "type": "array",
                          "title": "Basic Authentication",
                          "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "bearer": {
                          "type": "array",
                          "title": "Bearer Token Authentication",
                          "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "digest": {
                          "type": "array",
                          "title": "Digest Authentication",
                          "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "edgegrid": {
                          "type": "array",
                          "title": "EdgeGrid Authentication",
                          "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "hawk": {
                          "type": "array",
                          "title": "Hawk Authentication",
                          "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "ntlm": {
                          "type": "array",
                          "title": "NTLM Authentication",
                          "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "oauth1": {
                          "type": "array",
                          "title": "OAuth1",
                          "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "oauth2": {
                          "type": "array",
                          "title": "OAuth2",
                          "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                },
                "proxy": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/proxy-config",
                  "title": "Proxy Config",
                  "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                  "type": "object",
                  "properties": {
                    "match": {
                      "default": "http+https://*/*",
                      "description": "The Url match for which the proxy config is defined",
                      "type": "string"
                    },
                    "host": {
                      "type": "string",
                      "description": "The proxy server host"
                    },
                    "port": {
                      "type": "integer",
                      "minimum": 0,
                      "default": 8080,
                      "description": "The proxy server port"
                    },
                    "tunnel": {
                      "description": "The tunneling details for the proxy config",
                      "default": false,
                      "type": "boolean"
                    },
                    "disabled": {
                      "type": "boolean",
                      "default": false,
                      "description": "When set to true, ignores this proxy configuration entity"
                    }
                  }
                },
                "certificate": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/certificate",
                  "title": "Certificate",
                  "description": "A representation of an ssl certificate",
                  "type": "object",
                  "properties": {
                    "name": {
                      "description": "A name for the certificate for user reference",
                      "type": "string"
                    },
                    "matches": {
                      "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "description": "An Url match pattern string"
                      }
                    },
                    "key": {
                      "description": "An object containing path to file containing private key, on the file system",
                      "type": "object",
                      "properties": {
                        "src": {
                          "description": "The path to file containing key for certificate, on the file system"
                        }
                      }
                    },
                    "cert": {
                      "description": "An object containing path to file certificate, on the file system",
                      "type": "object",
                      "properties": {
                        "src": {
                          "description": "The path to file containing key for certificate, on the file system"
                        }
                      }
                    },
                    "passphrase": {
                      "description": "The passphrase for the certificate",
                      "type": "string"
                    }
                  }
                },
                "method": {
                  "anyOf": [
                    {
                      "description": "The Standard HTTP method associated with this request.",
                      "type": "string",
                      "enum": [
                        "GET",
                        "PUT",
                        "POST",
                        "PATCH",
                        "DELETE",
                        "COPY",
                        "HEAD",
                        "OPTIONS",
                        "LINK",
                        "UNLINK",
                        "PURGE",
                        "LOCK",
                        "UNLOCK",
                        "PROPFIND",
                        "VIEW"
                      ]
                    },
                    {
                      "description": "The Custom HTTP method associated with this request.",
                      "type": "string"
                    }
                  ]
                },
                "description": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/description",
                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                  "oneOf": [
                    {
                      "type": "object",
                      "title": "Description",
                      "properties": {
                        "content": {
                          "type": "string",
                          "description": "The content of the description goes here, as a raw string."
                        },
                        "type": {
                          "type": "string",
                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                        },
                        "version": {
                          "description": "Description can have versions associated with it, which should be put in this property."
                        }
                      }
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "header": {
                  "oneOf": [
                    {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/header-list",
                      "title": "Header List",
                      "description": "A representation for a list of headers",
                      "type": "array",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Header",
                        "id": "#/definitions/header",
                        "description": "Represents a single HTTP Header",
                        "properties": {
                          "key": {
                            "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                            "type": "string"
                          },
                          "value": {
                            "type": "string",
                            "description": "The value (or the RHS) of the Header is stored in this field."
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "If set to true, the current header will not be sent with requests."
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "key",
                          "value"
                        ]
                      }
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "body": {
                  "oneOf": [
                    {
                      "type": "object",
                      "description": "This field contains the data usually contained in the request body.",
                      "properties": {
                        "mode": {
                          "description": "Postman stores the type of data associated with this request in this field.",
                          "enum": [
                            "raw",
                            "urlencoded",
                            "formdata",
                            "file",
                            "graphql"
                          ]
                        },
                        "raw": {
                          "type": "string"
                        },
                        "urlencoded": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "title": "UrlEncodedParameter",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "formdata": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "title": "FormParameter",
                            "anyOf": [
                              {
                                "properties": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "When set to true, prevents this form data entity from being sent."
                                  },
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "text"
                                    ]
                                  },
                                  "contentType": {
                                    "type": "string",
                                    "description": "Override Content-Type header of this form data entity."
                                  },
                                  "description": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/description",
                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "title": "Description",
                                        "properties": {
                                          "content": {
                                            "type": "string",
                                            "description": "The content of the description goes here, as a raw string."
                                          },
                                          "type": {
                                            "type": "string",
                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                          },
                                          "version": {
                                            "description": "Description can have versions associated with it, which should be put in this property."
                                          }
                                        }
                                      },
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "key"
                                ]
                              },
                              {
                                "properties": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "src": {
                                    "oneOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      },
                                      {
                                        "type": "array"
                                      }
                                    ]
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "When set to true, prevents this form data entity from being sent."
                                  },
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "file"
                                    ]
                                  },
                                  "contentType": {
                                    "type": "string",
                                    "description": "Override Content-Type header of this form data entity."
                                  },
                                  "description": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/description",
                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "title": "Description",
                                        "properties": {
                                          "content": {
                                            "type": "string",
                                            "description": "The content of the description goes here, as a raw string."
                                          },
                                          "type": {
                                            "type": "string",
                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                          },
                                          "version": {
                                            "description": "Description can have versions associated with it, which should be put in this property."
                                          }
                                        }
                                      },
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "key"
                                ]
                              }
                            ]
                          }
                        },
                        "file": {
                          "type": "object",
                          "properties": {
                            "src": {
                              "oneOf": [
                                {
                                  "type": "string",
                                  "description": "Contains the name of the file to upload. _Not the path_."
                                },
                                {
                                  "type": "null",
                                  "description": "A null src indicates that no file has been selected as a part of the request body"
                                }
                              ]
                            },
                            "content": {
                              "type": "string"
                            }
                          }
                        },
                        "graphql": {
                          "type": "object"
                        },
                        "options": {
                          "type": "object",
                          "description": "Additional configurations and options set for various body modes."
                        },
                        "disabled": {
                          "type": "boolean",
                          "default": false,
                          "description": "When set to true, prevents request body from being sent."
                        }
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              }
            },
            {
              "type": "string"
            }
          ]
        },
        "response": {
          "type": "array",
          "title": "Responses",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/response",
            "title": "Response",
            "description": "A response represents an HTTP response.",
            "properties": {
              "id": {
                "description": "A unique, user defined identifier that can  be used to refer to this response from requests.",
                "type": "string"
              },
              "originalRequest": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/request",
                "title": "Request",
                "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
                "oneOf": [
                  {
                    "type": "object",
                    "title": "Request",
                    "properties": {
                      "url": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                        "id": "#/definitions/url",
                        "title": "Url",
                        "oneOf": [
                          {
                            "type": "object",
                            "properties": {
                              "raw": {
                                "type": "string",
                                "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                              },
                              "protocol": {
                                "type": "string",
                                "description": "The protocol associated with the request, E.g: 'http'"
                              },
                              "host": {
                                "title": "Host",
                                "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The host, split into subdomain strings."
                                  }
                                ]
                              },
                              "path": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "array",
                                    "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                                    "items": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "object",
                                          "properties": {
                                            "type": {
                                              "type": "string"
                                            },
                                            "value": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ]
                              },
                              "port": {
                                "type": "string",
                                "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                              },
                              "query": {
                                "type": "array",
                                "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                                "items": {
                                  "type": "object",
                                  "title": "QueryParam",
                                  "properties": {
                                    "key": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "value": {
                                      "oneOf": [
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "If set to true, the current query parameter will not be sent with the request."
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    }
                                  }
                                }
                              },
                              "hash": {
                                "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                                "type": "string"
                              },
                              "variable": {
                                "type": "array",
                                "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/variable",
                                  "title": "Variable",
                                  "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                      "type": "string"
                                    },
                                    "key": {
                                      "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                      "type": "string"
                                    },
                                    "value": {
                                      "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                                    },
                                    "type": {
                                      "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                      "type": "string",
                                      "enum": [
                                        "string",
                                        "boolean",
                                        "any",
                                        "number"
                                      ]
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "Variable name"
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    },
                                    "system": {
                                      "type": "boolean",
                                      "default": false,
                                      "description": "When set to true, indicates that this variable has been set by Postman"
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false
                                    }
                                  },
                                  "anyOf": [
                                    {
                                      "required": [
                                        "id"
                                      ]
                                    },
                                    {
                                      "required": [
                                        "key"
                                      ]
                                    },
                                    {
                                      "required": [
                                        "id",
                                        "key"
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          },
                          {
                            "type": "string"
                          }
                        ]
                      },
                      "auth": {
                        "oneOf": [
                          {
                            "type": "null"
                          },
                          {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth",
                            "description": "Represents authentication helpers provided by Postman",
                            "properties": {
                              "type": {
                                "type": "string",
                                "enum": [
                                  "apikey",
                                  "awsv4",
                                  "basic",
                                  "bearer",
                                  "digest",
                                  "edgegrid",
                                  "hawk",
                                  "noauth",
                                  "oauth1",
                                  "oauth2",
                                  "ntlm"
                                ]
                              },
                              "noauth": {},
                              "apikey": {
                                "type": "array",
                                "title": "API Key Authentication",
                                "description": "The attributes for API Key Authentication.",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "awsv4": {
                                "type": "array",
                                "title": "AWS Signature v4",
                                "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "basic": {
                                "type": "array",
                                "title": "Basic Authentication",
                                "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "bearer": {
                                "type": "array",
                                "title": "Bearer Token Authentication",
                                "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "digest": {
                                "type": "array",
                                "title": "Digest Authentication",
                                "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "edgegrid": {
                                "type": "array",
                                "title": "EdgeGrid Authentication",
                                "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "hawk": {
                                "type": "array",
                                "title": "Hawk Authentication",
                                "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "ntlm": {
                                "type": "array",
                                "title": "NTLM Authentication",
                                "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "oauth1": {
                                "type": "array",
                                "title": "OAuth1",
                                "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "oauth2": {
                                "type": "array",
                                "title": "OAuth2",
                                "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                                "items": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "title": "Auth",
                                  "id": "#/definitions/auth-attribute",
                                  "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {},
                                    "type": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              }
                            },
                            "required": [
                              "type"
                            ]
                          }
                        ]
                      },
                      "proxy": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/proxy-config",
                        "title": "Proxy Config",
                        "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                        "type": "object",
                        "properties": {
                          "match": {
                            "default": "http+https://*/*",
                            "description": "The Url match for which the proxy config is defined",
                            "type": "string"
                          },
                          "host": {
                            "type": "string",
                            "description": "The proxy server host"
                          },
                          "port": {
                            "type": "integer",
                            "minimum": 0,
                            "default": 8080,
                            "description": "The proxy server port"
                          },
                          "tunnel": {
                            "description": "The tunneling details for the proxy config",
                            "default": false,
                            "type": "boolean"
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "When set to true, ignores this proxy configuration entity"
                          }
                        }
                      },
                      "certificate": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/certificate",
                        "title": "Certificate",
                        "description": "A representation of an ssl certificate",
                        "type": "object",
                        "properties": {
                          "name": {
                            "description": "A name for the certificate for user reference",
                            "type": "string"
                          },
                          "matches": {
                            "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                            "type": "array",
                            "items": {
                              "type": "string",
                              "description": "An Url match pattern string"
                            }
                          },
                          "key": {
                            "description": "An object containing path to file containing private key, on the file system",
                            "type": "object",
                            "properties": {
                              "src": {
                                "description": "The path to file containing key for certificate, on the file system"
                              }
                            }
                          },
                          "cert": {
                            "description": "An object containing path to file certificate, on the file system",
                            "type": "object",
                            "properties": {
                              "src": {
                                "description": "The path to file containing key for certificate, on the file system"
                              }
                            }
                          },
                          "passphrase": {
                            "description": "The passphrase for the certificate",
                            "type": "string"
                          }
                        }
                      },
                      "method": {
                        "anyOf": [
                          {
                            "description": "The Standard HTTP method associated with this request.",
                            "type": "string",
                            "enum": [
                              "GET",
                              "PUT",
                              "POST",
                              "PATCH",
                              "DELETE",
                              "COPY",
                              "HEAD",
                              "OPTIONS",
                              "LINK",
                              "UNLINK",
                              "PURGE",
                              "LOCK",
                              "UNLOCK",
                              "PROPFIND",
                              "VIEW"
                            ]
                          },
                          {
                            "description": "The Custom HTTP method associated with this request.",
                            "type": "string"
                          }
                        ]
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "header": {
                        "oneOf": [
                          {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/header-list",
                            "title": "Header List",
                            "description": "A representation for a list of headers",
                            "type": "array",
                            "items": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "type": "object",
                              "title": "Header",
                              "id": "#/definitions/header",
                              "description": "Represents a single HTTP Header",
                              "properties": {
                                "key": {
                                  "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                                  "type": "string"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "The value (or the RHS) of the Header is stored in this field."
                                },
                                "disabled": {
                                  "type": "boolean",
                                  "default": false,
                                  "description": "If set to true, the current header will not be sent with requests."
                                },
                                "description": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "id": "#/definitions/description",
                                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                  "oneOf": [
                                    {
                                      "type": "object",
                                      "title": "Description",
                                      "properties": {
                                        "content": {
                                          "type": "string",
                                          "description": "The content of the description goes here, as a raw string."
                                        },
                                        "type": {
                                          "type": "string",
                                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                        },
                                        "version": {
                                          "description": "Description can have versions associated with it, which should be put in this property."
                                        }
                                      }
                                    },
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              },
                              "required": [
                                "key",
                                "value"
                              ]
                            }
                          },
                          {
                            "type": "string"
                          }
                        ]
                      },
                      "body": {
                        "oneOf": [
                          {
                            "type": "object",
                            "description": "This field contains the data usually contained in the request body.",
                            "properties": {
                              "mode": {
                                "description": "Postman stores the type of data associated with this request in this field.",
                                "enum": [
                                  "raw",
                                  "urlencoded",
                                  "formdata",
                                  "file",
                                  "graphql"
                                ]
                              },
                              "raw": {
                                "type": "string"
                              },
                              "urlencoded": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "title": "UrlEncodedParameter",
                                  "properties": {
                                    "key": {
                                      "type": "string"
                                    },
                                    "value": {
                                      "type": "string"
                                    },
                                    "disabled": {
                                      "type": "boolean",
                                      "default": false
                                    },
                                    "description": {
                                      "$schema": "http://json-schema.org/draft-04/schema#",
                                      "id": "#/definitions/description",
                                      "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                      "oneOf": [
                                        {
                                          "type": "object",
                                          "title": "Description",
                                          "properties": {
                                            "content": {
                                              "type": "string",
                                              "description": "The content of the description goes here, as a raw string."
                                            },
                                            "type": {
                                              "type": "string",
                                              "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                            },
                                            "version": {
                                              "description": "Description can have versions associated with it, which should be put in this property."
                                            }
                                          }
                                        },
                                        {
                                          "type": "string"
                                        },
                                        {
                                          "type": "null"
                                        }
                                      ]
                                    }
                                  },
                                  "required": [
                                    "key"
                                  ]
                                }
                              },
                              "formdata": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "title": "FormParameter",
                                  "anyOf": [
                                    {
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "value": {
                                          "type": "string"
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, prevents this form data entity from being sent."
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "text"
                                          ]
                                        },
                                        "contentType": {
                                          "type": "string",
                                          "description": "Override Content-Type header of this form data entity."
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    },
                                    {
                                      "properties": {
                                        "key": {
                                          "type": "string"
                                        },
                                        "src": {
                                          "oneOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            },
                                            {
                                              "type": "array"
                                            }
                                          ]
                                        },
                                        "disabled": {
                                          "type": "boolean",
                                          "default": false,
                                          "description": "When set to true, prevents this form data entity from being sent."
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "file"
                                          ]
                                        },
                                        "contentType": {
                                          "type": "string",
                                          "description": "Override Content-Type header of this form data entity."
                                        },
                                        "description": {
                                          "$schema": "http://json-schema.org/draft-04/schema#",
                                          "id": "#/definitions/description",
                                          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                          "oneOf": [
                                            {
                                              "type": "object",
                                              "title": "Description",
                                              "properties": {
                                                "content": {
                                                  "type": "string",
                                                  "description": "The content of the description goes here, as a raw string."
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                                },
                                                "version": {
                                                  "description": "Description can have versions associated with it, which should be put in this property."
                                                }
                                              }
                                            },
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        }
                                      },
                                      "required": [
                                        "key"
                                      ]
                                    }
                                  ]
                                }
                              },
                              "file": {
                                "type": "object",
                                "properties": {
                                  "src": {
                                    "oneOf": [
                                      {
                                        "type": "string",
                                        "description": "Contains the name of the file to upload. _Not the path_."
                                      },
                                      {
                                        "type": "null",
                                        "description": "A null src indicates that no file has been selected as a part of the request body"
                                      }
                                    ]
                                  },
                                  "content": {
                                    "type": "string"
                                  }
                                }
                              },
                              "graphql": {
                                "type": "object"
                              },
                              "options": {
                                "type": "object",
                                "description": "Additional configurations and options set for various body modes."
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, prevents request body from being sent."
                              }
                            }
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    }
                  },
                  {
                    "type": "string"
                  }
                ]
              },
              "responseTime": {
                "title": "ResponseTime",
                "oneOf": [
                  {
                    "type": "null"
                  },
                  {
                    "type": "string"
                  },
                  {
                    "type": "number"
                  }
                ],
                "description": "The time taken by the request to complete. If a number, the unit is milliseconds. If the response is manually created, this can be set to `null`."
              },
              "timings": {
                "title": "Response Timings",
                "description": "Set of timing information related to request and response in milliseconds",
                "oneOf": [
                  {
                    "type": "object"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "header": {
                "title": "Headers",
                "oneOf": [
                  {
                    "type": "array",
                    "title": "Header",
                    "description": "No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.",
                    "items": {
                      "oneOf": [
                        {
                          "$schema": "http://json-schema.org/draft-04/schema#",
                          "type": "object",
                          "title": "Header",
                          "id": "#/definitions/header",
                          "description": "Represents a single HTTP Header",
                          "properties": {
                            "key": {
                              "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                              "type": "string"
                            },
                            "value": {
                              "type": "string",
                              "description": "The value (or the RHS) of the Header is stored in this field."
                            },
                            "disabled": {
                              "type": "boolean",
                              "default": false,
                              "description": "If set to true, the current header will not be sent with requests."
                            },
                            "description": {
                              "$schema": "http://json-schema.org/draft-04/schema#",
                              "id": "#/definitions/description",
                              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                              "oneOf": [
                                {
                                  "type": "object",
                                  "title": "Description",
                                  "properties": {
                                    "content": {
                                      "type": "string",
                                      "description": "The content of the description goes here, as a raw string."
                                    },
                                    "type": {
                                      "type": "string",
                                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                    },
                                    "version": {
                                      "description": "Description can have versions associated with it, which should be put in this property."
                                    }
                                  }
                                },
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            }
                          },
                          "required": [
                            "key",
                            "value"
                          ]
                        },
                        {
                          "title": "Header",
                          "type": "string"
                        }
                      ]
                    }
                  },
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "cookie": {
                "type": "array",
                "items": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "title": "Cookie",
                  "id": "#/definitions/cookie",
                  "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
                  "properties": {
                    "domain": {
                      "type": "string",
                      "description": "The domain for which this cookie is valid."
                    },
                    "expires": {
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "number"
                        }
                      ],
                      "description": "When the cookie expires."
                    },
                    "maxAge": {
                      "type": "string"
                    },
                    "hostOnly": {
                      "type": "boolean",
                      "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
                    },
                    "httpOnly": {
                      "type": "boolean",
                      "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
                    },
                    "name": {
                      "type": "string",
                      "description": "This is the name of the Cookie."
                    },
                    "path": {
                      "type": "string",
                      "description": "The path associated with the Cookie."
                    },
                    "secure": {
                      "type": "boolean",
                      "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
                    },
                    "session": {
                      "type": "boolean",
                      "description": "True if the cookie is a session cookie."
                    },
                    "value": {
                      "type": "string",
                      "description": "The value of the Cookie."
                    },
                    "extensions": {
                      "type": "array",
                      "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
                    }
                  },
                  "required": [
                    "domain",
                    "path"
                  ]
                }
              },
              "body": {
                "type": [
                  "null",
                  "string"
                ],
                "description": "The raw text of the response."
              },
              "status": {
                "type": "string",
                "description": "The response status, e.g: '200 OK'"
              },
              "code": {
                "type": "integer",
                "description": "The numerical response code, example: 200, 201, 404, etc."
              }
            }
          }
        },
        "protocolProfileBehavior": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "type": "object",
          "title": "Protocol Profile Behavior",
          "id": "#/definitions/protocol-profile-behavior",
          "description": "Set of configurations used to alter the usual behavior of sending the request"
        }
      },
      "required": [
        "request"
      ]
    },
    "protocol-profile-behavior": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "title": "Protocol Profile Behavior",
      "id": "#/definitions/protocol-profile-behavior",
      "description": "Set of configurations used to alter the usual behavior of sending the request"
    },
    "proxy-config": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/proxy-config",
      "title": "Proxy Config",
      "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
      "type": "object",
      "properties": {
        "match": {
          "default": "http+https://*/*",
          "description": "The Url match for which the proxy config is defined",
          "type": "string"
        },
        "host": {
          "type": "string",
          "description": "The proxy server host"
        },
        "port": {
          "type": "integer",
          "minimum": 0,
          "default": 8080,
          "description": "The proxy server port"
        },
        "tunnel": {
          "description": "The tunneling details for the proxy config",
          "default": false,
          "type": "boolean"
        },
        "disabled": {
          "type": "boolean",
          "default": false,
          "description": "When set to true, ignores this proxy configuration entity"
        }
      }
    },
    "request": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/request",
      "title": "Request",
      "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
      "oneOf": [
        {
          "type": "object",
          "title": "Request",
          "properties": {
            "url": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
              "id": "#/definitions/url",
              "title": "Url",
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "raw": {
                      "type": "string",
                      "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                    },
                    "protocol": {
                      "type": "string",
                      "description": "The protocol associated with the request, E.g: 'http'"
                    },
                    "host": {
                      "title": "Host",
                      "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "The host, split into subdomain strings."
                        }
                      ]
                    },
                    "path": {
                      "oneOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                          "items": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "type": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "port": {
                      "type": "string",
                      "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                    },
                    "query": {
                      "type": "array",
                      "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                      "items": {
                        "type": "object",
                        "title": "QueryParam",
                        "properties": {
                          "key": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "value": {
                            "oneOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "If set to true, the current query parameter will not be sent with the request."
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        }
                      }
                    },
                    "hash": {
                      "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                      "type": "string"
                    },
                    "variable": {
                      "type": "array",
                      "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/variable",
                        "title": "Variable",
                        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                        "type": "object",
                        "properties": {
                          "id": {
                            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                            "type": "string"
                          },
                          "key": {
                            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                            "type": "string"
                          },
                          "value": {
                            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                          },
                          "type": {
                            "description": "A variable may have multiple types. This field specifies the type of the variable.",
                            "type": "string",
                            "enum": [
                              "string",
                              "boolean",
                              "any",
                              "number"
                            ]
                          },
                          "name": {
                            "type": "string",
                            "description": "Variable name"
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "system": {
                            "type": "boolean",
                            "default": false,
                            "description": "When set to true, indicates that this variable has been set by Postman"
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false
                          }
                        },
                        "anyOf": [
                          {
                            "required": [
                              "id"
                            ]
                          },
                          {
                            "required": [
                              "key"
                            ]
                          },
                          {
                            "required": [
                              "id",
                              "key"
                            ]
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "type": "string"
                }
              ]
            },
            "auth": {
              "oneOf": [
                {
                  "type": "null"
                },
                {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "type": "object",
                  "title": "Auth",
                  "id": "#/definitions/auth",
                  "description": "Represents authentication helpers provided by Postman",
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "apikey",
                        "awsv4",
                        "basic",
                        "bearer",
                        "digest",
                        "edgegrid",
                        "hawk",
                        "noauth",
                        "oauth1",
                        "oauth2",
                        "ntlm"
                      ]
                    },
                    "noauth": {},
                    "apikey": {
                      "type": "array",
                      "title": "API Key Authentication",
                      "description": "The attributes for API Key Authentication.",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "awsv4": {
                      "type": "array",
                      "title": "AWS Signature v4",
                      "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "basic": {
                      "type": "array",
                      "title": "Basic Authentication",
                      "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "bearer": {
                      "type": "array",
                      "title": "Bearer Token Authentication",
                      "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "digest": {
                      "type": "array",
                      "title": "Digest Authentication",
                      "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "edgegrid": {
                      "type": "array",
                      "title": "EdgeGrid Authentication",
                      "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "hawk": {
                      "type": "array",
                      "title": "Hawk Authentication",
                      "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "ntlm": {
                      "type": "array",
                      "title": "NTLM Authentication",
                      "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "oauth1": {
                      "type": "array",
                      "title": "OAuth1",
                      "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "oauth2": {
                      "type": "array",
                      "title": "OAuth2",
                      "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Auth",
                        "id": "#/definitions/auth-attribute",
                        "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {},
                          "type": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    }
                  },
                  "required": [
                    "type"
                  ]
                }
              ]
            },
            "proxy": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "id": "#/definitions/proxy-config",
              "title": "Proxy Config",
              "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
              "type": "object",
              "properties": {
                "match": {
                  "default": "http+https://*/*",
                  "description": "The Url match for which the proxy config is defined",
                  "type": "string"
                },
                "host": {
                  "type": "string",
                  "description": "The proxy server host"
                },
                "port": {
                  "type": "integer",
                  "minimum": 0,
                  "default": 8080,
                  "description": "The proxy server port"
                },
                "tunnel": {
                  "description": "The tunneling details for the proxy config",
                  "default": false,
                  "type": "boolean"
                },
                "disabled": {
                  "type": "boolean",
                  "default": false,
                  "description": "When set to true, ignores this proxy configuration entity"
                }
              }
            },
            "certificate": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "id": "#/definitions/certificate",
              "title": "Certificate",
              "description": "A representation of an ssl certificate",
              "type": "object",
              "properties": {
                "name": {
                  "description": "A name for the certificate for user reference",
                  "type": "string"
                },
                "matches": {
                  "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "An Url match pattern string"
                  }
                },
                "key": {
                  "description": "An object containing path to file containing private key, on the file system",
                  "type": "object",
                  "properties": {
                    "src": {
                      "description": "The path to file containing key for certificate, on the file system"
                    }
                  }
                },
                "cert": {
                  "description": "An object containing path to file certificate, on the file system",
                  "type": "object",
                  "properties": {
                    "src": {
                      "description": "The path to file containing key for certificate, on the file system"
                    }
                  }
                },
                "passphrase": {
                  "description": "The passphrase for the certificate",
                  "type": "string"
                }
              }
            },
            "method": {
              "anyOf": [
                {
                  "description": "The Standard HTTP method associated with this request.",
                  "type": "string",
                  "enum": [
                    "GET",
                    "PUT",
                    "POST",
                    "PATCH",
                    "DELETE",
                    "COPY",
                    "HEAD",
                    "OPTIONS",
                    "LINK",
                    "UNLINK",
                    "PURGE",
                    "LOCK",
                    "UNLOCK",
                    "PROPFIND",
                    "VIEW"
                  ]
                },
                {
                  "description": "The Custom HTTP method associated with this request.",
                  "type": "string"
                }
              ]
            },
            "description": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "id": "#/definitions/description",
              "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
              "oneOf": [
                {
                  "type": "object",
                  "title": "Description",
                  "properties": {
                    "content": {
                      "type": "string",
                      "description": "The content of the description goes here, as a raw string."
                    },
                    "type": {
                      "type": "string",
                      "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                    },
                    "version": {
                      "description": "Description can have versions associated with it, which should be put in this property."
                    }
                  }
                },
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "header": {
              "oneOf": [
                {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/header-list",
                  "title": "Header List",
                  "description": "A representation for a list of headers",
                  "type": "array",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Header",
                    "id": "#/definitions/header",
                    "description": "Represents a single HTTP Header",
                    "properties": {
                      "key": {
                        "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                        "type": "string"
                      },
                      "value": {
                        "type": "string",
                        "description": "The value (or the RHS) of the Header is stored in this field."
                      },
                      "disabled": {
                        "type": "boolean",
                        "default": false,
                        "description": "If set to true, the current header will not be sent with requests."
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    },
                    "required": [
                      "key",
                      "value"
                    ]
                  }
                },
                {
                  "type": "string"
                }
              ]
            },
            "body": {
              "oneOf": [
                {
                  "type": "object",
                  "description": "This field contains the data usually contained in the request body.",
                  "properties": {
                    "mode": {
                      "description": "Postman stores the type of data associated with this request in this field.",
                      "enum": [
                        "raw",
                        "urlencoded",
                        "formdata",
                        "file",
                        "graphql"
                      ]
                    },
                    "raw": {
                      "type": "string"
                    },
                    "urlencoded": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "title": "UrlEncodedParameter",
                        "properties": {
                          "key": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "key"
                        ]
                      }
                    },
                    "formdata": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "title": "FormParameter",
                        "anyOf": [
                          {
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, prevents this form data entity from being sent."
                              },
                              "type": {
                                "type": "string",
                                "enum": [
                                  "text"
                                ]
                              },
                              "contentType": {
                                "type": "string",
                                "description": "Override Content-Type header of this form data entity."
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            },
                            "required": [
                              "key"
                            ]
                          },
                          {
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "src": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  },
                                  {
                                    "type": "array"
                                  }
                                ]
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, prevents this form data entity from being sent."
                              },
                              "type": {
                                "type": "string",
                                "enum": [
                                  "file"
                                ]
                              },
                              "contentType": {
                                "type": "string",
                                "description": "Override Content-Type header of this form data entity."
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        ]
                      }
                    },
                    "file": {
                      "type": "object",
                      "properties": {
                        "src": {
                          "oneOf": [
                            {
                              "type": "string",
                              "description": "Contains the name of the file to upload. _Not the path_."
                            },
                            {
                              "type": "null",
                              "description": "A null src indicates that no file has been selected as a part of the request body"
                            }
                          ]
                        },
                        "content": {
                          "type": "string"
                        }
                      }
                    },
                    "graphql": {
                      "type": "object"
                    },
                    "options": {
                      "type": "object",
                      "description": "Additional configurations and options set for various body modes."
                    },
                    "disabled": {
                      "type": "boolean",
                      "default": false,
                      "description": "When set to true, prevents request body from being sent."
                    }
                  }
                },
                {
                  "type": "null"
                }
              ]
            }
          }
        },
        {
          "type": "string"
        }
      ]
    },
    "response": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/response",
      "title": "Response",
      "description": "A response represents an HTTP response.",
      "properties": {
        "id": {
          "description": "A unique, user defined identifier that can  be used to refer to this response from requests.",
          "type": "string"
        },
        "originalRequest": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/request",
          "title": "Request",
          "description": "A request represents an HTTP request. If a string, the string is assumed to be the request URL and the method is assumed to be 'GET'.",
          "oneOf": [
            {
              "type": "object",
              "title": "Request",
              "properties": {
                "url": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
                  "id": "#/definitions/url",
                  "title": "Url",
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "raw": {
                          "type": "string",
                          "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                        },
                        "protocol": {
                          "type": "string",
                          "description": "The protocol associated with the request, E.g: 'http'"
                        },
                        "host": {
                          "title": "Host",
                          "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                          "oneOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The host, split into subdomain strings."
                            }
                          ]
                        },
                        "path": {
                          "oneOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "array",
                              "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                              "items": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "object",
                                    "properties": {
                                      "type": {
                                        "type": "string"
                                      },
                                      "value": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        },
                        "port": {
                          "type": "string",
                          "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                        },
                        "query": {
                          "type": "array",
                          "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                          "items": {
                            "type": "object",
                            "title": "QueryParam",
                            "properties": {
                              "key": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "value": {
                                "oneOf": [
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false,
                                "description": "If set to true, the current query parameter will not be sent with the request."
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            }
                          }
                        },
                        "hash": {
                          "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                          "type": "string"
                        },
                        "variable": {
                          "type": "array",
                          "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/variable",
                            "title": "Variable",
                            "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                            "type": "object",
                            "properties": {
                              "id": {
                                "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                "type": "string"
                              },
                              "key": {
                                "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                                "type": "string"
                              },
                              "value": {
                                "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                              },
                              "type": {
                                "description": "A variable may have multiple types. This field specifies the type of the variable.",
                                "type": "string",
                                "enum": [
                                  "string",
                                  "boolean",
                                  "any",
                                  "number"
                                ]
                              },
                              "name": {
                                "type": "string",
                                "description": "Variable name"
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "system": {
                                "type": "boolean",
                                "default": false,
                                "description": "When set to true, indicates that this variable has been set by Postman"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false
                              }
                            },
                            "anyOf": [
                              {
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "required": [
                                  "key"
                                ]
                              },
                              {
                                "required": [
                                  "id",
                                  "key"
                                ]
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "auth": {
                  "oneOf": [
                    {
                      "type": "null"
                    },
                    {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "type": "object",
                      "title": "Auth",
                      "id": "#/definitions/auth",
                      "description": "Represents authentication helpers provided by Postman",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "apikey",
                            "awsv4",
                            "basic",
                            "bearer",
                            "digest",
                            "edgegrid",
                            "hawk",
                            "noauth",
                            "oauth1",
                            "oauth2",
                            "ntlm"
                          ]
                        },
                        "noauth": {},
                        "apikey": {
                          "type": "array",
                          "title": "API Key Authentication",
                          "description": "The attributes for API Key Authentication.",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "awsv4": {
                          "type": "array",
                          "title": "AWS Signature v4",
                          "description": "The attributes for [AWS Auth](http://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "basic": {
                          "type": "array",
                          "title": "Basic Authentication",
                          "description": "The attributes for [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "bearer": {
                          "type": "array",
                          "title": "Bearer Token Authentication",
                          "description": "The helper attributes for [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "digest": {
                          "type": "array",
                          "title": "Digest Authentication",
                          "description": "The attributes for [Digest Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "edgegrid": {
                          "type": "array",
                          "title": "EdgeGrid Authentication",
                          "description": "The attributes for [Akamai EdgeGrid Authentication](https://developer.akamai.com/legacy/introduction/Client_Auth.html).",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "hawk": {
                          "type": "array",
                          "title": "Hawk Authentication",
                          "description": "The attributes for [Hawk Authentication](https://github.com/hueniverse/hawk)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "ntlm": {
                          "type": "array",
                          "title": "NTLM Authentication",
                          "description": "The attributes for [NTLM Authentication](https://msdn.microsoft.com/en-us/library/cc237488.aspx)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "oauth1": {
                          "type": "array",
                          "title": "OAuth1",
                          "description": "The attributes for [OAuth2](https://oauth.net/1/)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "oauth2": {
                          "type": "array",
                          "title": "OAuth2",
                          "description": "Helper attributes for [OAuth2](https://oauth.net/2/)",
                          "items": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "type": "object",
                            "title": "Auth",
                            "id": "#/definitions/auth-attribute",
                            "description": "Represents an attribute for any authorization method provided by Postman. For example `username` and `password` are set as auth attributes for Basic Authentication method.",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {},
                              "type": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        }
                      },
                      "required": [
                        "type"
                      ]
                    }
                  ]
                },
                "proxy": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/proxy-config",
                  "title": "Proxy Config",
                  "description": "Using the Proxy, you can configure your custom proxy into the postman for particular url match",
                  "type": "object",
                  "properties": {
                    "match": {
                      "default": "http+https://*/*",
                      "description": "The Url match for which the proxy config is defined",
                      "type": "string"
                    },
                    "host": {
                      "type": "string",
                      "description": "The proxy server host"
                    },
                    "port": {
                      "type": "integer",
                      "minimum": 0,
                      "default": 8080,
                      "description": "The proxy server port"
                    },
                    "tunnel": {
                      "description": "The tunneling details for the proxy config",
                      "default": false,
                      "type": "boolean"
                    },
                    "disabled": {
                      "type": "boolean",
                      "default": false,
                      "description": "When set to true, ignores this proxy configuration entity"
                    }
                  }
                },
                "certificate": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/certificate",
                  "title": "Certificate",
                  "description": "A representation of an ssl certificate",
                  "type": "object",
                  "properties": {
                    "name": {
                      "description": "A name for the certificate for user reference",
                      "type": "string"
                    },
                    "matches": {
                      "description": "A list of Url match pattern strings, to identify Urls this certificate can be used for.",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "description": "An Url match pattern string"
                      }
                    },
                    "key": {
                      "description": "An object containing path to file containing private key, on the file system",
                      "type": "object",
                      "properties": {
                        "src": {
                          "description": "The path to file containing key for certificate, on the file system"
                        }
                      }
                    },
                    "cert": {
                      "description": "An object containing path to file certificate, on the file system",
                      "type": "object",
                      "properties": {
                        "src": {
                          "description": "The path to file containing key for certificate, on the file system"
                        }
                      }
                    },
                    "passphrase": {
                      "description": "The passphrase for the certificate",
                      "type": "string"
                    }
                  }
                },
                "method": {
                  "anyOf": [
                    {
                      "description": "The Standard HTTP method associated with this request.",
                      "type": "string",
                      "enum": [
                        "GET",
                        "PUT",
                        "POST",
                        "PATCH",
                        "DELETE",
                        "COPY",
                        "HEAD",
                        "OPTIONS",
                        "LINK",
                        "UNLINK",
                        "PURGE",
                        "LOCK",
                        "UNLOCK",
                        "PROPFIND",
                        "VIEW"
                      ]
                    },
                    {
                      "description": "The Custom HTTP method associated with this request.",
                      "type": "string"
                    }
                  ]
                },
                "description": {
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "id": "#/definitions/description",
                  "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                  "oneOf": [
                    {
                      "type": "object",
                      "title": "Description",
                      "properties": {
                        "content": {
                          "type": "string",
                          "description": "The content of the description goes here, as a raw string."
                        },
                        "type": {
                          "type": "string",
                          "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                        },
                        "version": {
                          "description": "Description can have versions associated with it, which should be put in this property."
                        }
                      }
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "header": {
                  "oneOf": [
                    {
                      "$schema": "http://json-schema.org/draft-04/schema#",
                      "id": "#/definitions/header-list",
                      "title": "Header List",
                      "description": "A representation for a list of headers",
                      "type": "array",
                      "items": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "type": "object",
                        "title": "Header",
                        "id": "#/definitions/header",
                        "description": "Represents a single HTTP Header",
                        "properties": {
                          "key": {
                            "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                            "type": "string"
                          },
                          "value": {
                            "type": "string",
                            "description": "The value (or the RHS) of the Header is stored in this field."
                          },
                          "disabled": {
                            "type": "boolean",
                            "default": false,
                            "description": "If set to true, the current header will not be sent with requests."
                          },
                          "description": {
                            "$schema": "http://json-schema.org/draft-04/schema#",
                            "id": "#/definitions/description",
                            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                            "oneOf": [
                              {
                                "type": "object",
                                "title": "Description",
                                "properties": {
                                  "content": {
                                    "type": "string",
                                    "description": "The content of the description goes here, as a raw string."
                                  },
                                  "type": {
                                    "type": "string",
                                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                  },
                                  "version": {
                                    "description": "Description can have versions associated with it, which should be put in this property."
                                  }
                                }
                              },
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "key",
                          "value"
                        ]
                      }
                    },
                    {
                      "type": "string"
                    }
                  ]
                },
                "body": {
                  "oneOf": [
                    {
                      "type": "object",
                      "description": "This field contains the data usually contained in the request body.",
                      "properties": {
                        "mode": {
                          "description": "Postman stores the type of data associated with this request in this field.",
                          "enum": [
                            "raw",
                            "urlencoded",
                            "formdata",
                            "file",
                            "graphql"
                          ]
                        },
                        "raw": {
                          "type": "string"
                        },
                        "urlencoded": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "title": "UrlEncodedParameter",
                            "properties": {
                              "key": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              },
                              "disabled": {
                                "type": "boolean",
                                "default": false
                              },
                              "description": {
                                "$schema": "http://json-schema.org/draft-04/schema#",
                                "id": "#/definitions/description",
                                "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                "oneOf": [
                                  {
                                    "type": "object",
                                    "title": "Description",
                                    "properties": {
                                      "content": {
                                        "type": "string",
                                        "description": "The content of the description goes here, as a raw string."
                                      },
                                      "type": {
                                        "type": "string",
                                        "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                      },
                                      "version": {
                                        "description": "Description can have versions associated with it, which should be put in this property."
                                      }
                                    }
                                  },
                                  {
                                    "type": "string"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              }
                            },
                            "required": [
                              "key"
                            ]
                          }
                        },
                        "formdata": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "title": "FormParameter",
                            "anyOf": [
                              {
                                "properties": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "value": {
                                    "type": "string"
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "When set to true, prevents this form data entity from being sent."
                                  },
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "text"
                                    ]
                                  },
                                  "contentType": {
                                    "type": "string",
                                    "description": "Override Content-Type header of this form data entity."
                                  },
                                  "description": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/description",
                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "title": "Description",
                                        "properties": {
                                          "content": {
                                            "type": "string",
                                            "description": "The content of the description goes here, as a raw string."
                                          },
                                          "type": {
                                            "type": "string",
                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                          },
                                          "version": {
                                            "description": "Description can have versions associated with it, which should be put in this property."
                                          }
                                        }
                                      },
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "key"
                                ]
                              },
                              {
                                "properties": {
                                  "key": {
                                    "type": "string"
                                  },
                                  "src": {
                                    "oneOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      },
                                      {
                                        "type": "array"
                                      }
                                    ]
                                  },
                                  "disabled": {
                                    "type": "boolean",
                                    "default": false,
                                    "description": "When set to true, prevents this form data entity from being sent."
                                  },
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "file"
                                    ]
                                  },
                                  "contentType": {
                                    "type": "string",
                                    "description": "Override Content-Type header of this form data entity."
                                  },
                                  "description": {
                                    "$schema": "http://json-schema.org/draft-04/schema#",
                                    "id": "#/definitions/description",
                                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                                    "oneOf": [
                                      {
                                        "type": "object",
                                        "title": "Description",
                                        "properties": {
                                          "content": {
                                            "type": "string",
                                            "description": "The content of the description goes here, as a raw string."
                                          },
                                          "type": {
                                            "type": "string",
                                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                                          },
                                          "version": {
                                            "description": "Description can have versions associated with it, which should be put in this property."
                                          }
                                        }
                                      },
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "key"
                                ]
                              }
                            ]
                          }
                        },
                        "file": {
                          "type": "object",
                          "properties": {
                            "src": {
                              "oneOf": [
                                {
                                  "type": "string",
                                  "description": "Contains the name of the file to upload. _Not the path_."
                                },
                                {
                                  "type": "null",
                                  "description": "A null src indicates that no file has been selected as a part of the request body"
                                }
                              ]
                            },
                            "content": {
                              "type": "string"
                            }
                          }
                        },
                        "graphql": {
                          "type": "object"
                        },
                        "options": {
                          "type": "object",
                          "description": "Additional configurations and options set for various body modes."
                        },
                        "disabled": {
                          "type": "boolean",
                          "default": false,
                          "description": "When set to true, prevents request body from being sent."
                        }
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              }
            },
            {
              "type": "string"
            }
          ]
        },
        "responseTime": {
          "title": "ResponseTime",
          "oneOf": [
            {
              "type": "null"
            },
            {
              "type": "string"
            },
            {
              "type": "number"
            }
          ],
          "description": "The time taken by the request to complete. If a number, the unit is milliseconds. If the response is manually created, this can be set to `null`."
        },
        "timings": {
          "title": "Response Timings",
          "description": "Set of timing information related to request and response in milliseconds",
          "oneOf": [
            {
              "type": "object"
            },
            {
              "type": "null"
            }
          ]
        },
        "header": {
          "title": "Headers",
          "oneOf": [
            {
              "type": "array",
              "title": "Header",
              "description": "No HTTP request is complete without its headers, and the same is true for a Postman request. This field is an array containing all the headers.",
              "items": {
                "oneOf": [
                  {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "type": "object",
                    "title": "Header",
                    "id": "#/definitions/header",
                    "description": "Represents a single HTTP Header",
                    "properties": {
                      "key": {
                        "description": "This holds the LHS of the HTTP Header, e.g ``Content-Type`` or ``X-Custom-Header``",
                        "type": "string"
                      },
                      "value": {
                        "type": "string",
                        "description": "The value (or the RHS) of the Header is stored in this field."
                      },
                      "disabled": {
                        "type": "boolean",
                        "default": false,
                        "description": "If set to true, the current header will not be sent with requests."
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    },
                    "required": [
                      "key",
                      "value"
                    ]
                  },
                  {
                    "title": "Header",
                    "type": "string"
                  }
                ]
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "cookie": {
          "type": "array",
          "items": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "title": "Cookie",
            "id": "#/definitions/cookie",
            "description": "A Cookie, that follows the [Google Chrome format](https://developer.chrome.com/extensions/cookies)",
            "properties": {
              "domain": {
                "type": "string",
                "description": "The domain for which this cookie is valid."
              },
              "expires": {
                "oneOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "number"
                  }
                ],
                "description": "When the cookie expires."
              },
              "maxAge": {
                "type": "string"
              },
              "hostOnly": {
                "type": "boolean",
                "description": "True if the cookie is a host-only cookie. (i.e. a request's URL domain must exactly match the domain of the cookie)."
              },
              "httpOnly": {
                "type": "boolean",
                "description": "Indicates if this cookie is HTTP Only. (if True, the cookie is inaccessible to client-side scripts)"
              },
              "name": {
                "type": "string",
                "description": "This is the name of the Cookie."
              },
              "path": {
                "type": "string",
                "description": "The path associated with the Cookie."
              },
              "secure": {
                "type": "boolean",
                "description": "Indicates if the 'secure' flag is set on the Cookie, meaning that it is transmitted over secure connections only. (typically HTTPS)"
              },
              "session": {
                "type": "boolean",
                "description": "True if the cookie is a session cookie."
              },
              "value": {
                "type": "string",
                "description": "The value of the Cookie."
              },
              "extensions": {
                "type": "array",
                "description": "Custom attributes for a cookie go here, such as the [Priority Field](https://code.google.com/p/chromium/issues/detail?id=232693)"
              }
            },
            "required": [
              "domain",
              "path"
            ]
          }
        },
        "body": {
          "type": [
            "null",
            "string"
          ],
          "description": "The raw text of the response."
        },
        "status": {
          "type": "string",
          "description": "The response status, e.g: '200 OK'"
        },
        "code": {
          "type": "integer",
          "description": "The numerical response code, example: 200, 201, 404, etc."
        }
      }
    },
    "script": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/script",
      "title": "Script",
      "type": "object",
      "description": "A script is a snippet of Javascript code that can be used to to perform setup or teardown operations on a particular response.",
      "properties": {
        "id": {
          "description": "A unique, user defined identifier that can  be used to refer to this script from requests.",
          "type": "string"
        },
        "type": {
          "description": "Type of the script. E.g: 'text/javascript'",
          "type": "string"
        },
        "exec": {
          "oneOf": [
            {
              "type": "array",
              "description": "This is an array of strings, where each line represents a single line of code. Having lines separate makes it possible to easily track changes made to scripts.",
              "items": {
                "type": "string"
              }
            },
            {
              "type": "string"
            }
          ]
        },
        "src": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
          "id": "#/definitions/url",
          "title": "Url",
          "oneOf": [
            {
              "type": "object",
              "properties": {
                "raw": {
                  "type": "string",
                  "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
                },
                "protocol": {
                  "type": "string",
                  "description": "The protocol associated with the request, E.g: 'http'"
                },
                "host": {
                  "title": "Host",
                  "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "The host, split into subdomain strings."
                    }
                  ]
                },
                "path": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "array",
                      "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                      "items": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "object",
                            "properties": {
                              "type": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                },
                "port": {
                  "type": "string",
                  "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
                },
                "query": {
                  "type": "array",
                  "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
                  "items": {
                    "type": "object",
                    "title": "QueryParam",
                    "properties": {
                      "key": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "disabled": {
                        "type": "boolean",
                        "default": false,
                        "description": "If set to true, the current query parameter will not be sent with the request."
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    }
                  }
                },
                "hash": {
                  "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
                  "type": "string"
                },
                "variable": {
                  "type": "array",
                  "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
                  "items": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/variable",
                    "title": "Variable",
                    "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                    "type": "object",
                    "properties": {
                      "id": {
                        "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                        "type": "string"
                      },
                      "key": {
                        "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                        "type": "string"
                      },
                      "value": {
                        "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                      },
                      "type": {
                        "description": "A variable may have multiple types. This field specifies the type of the variable.",
                        "type": "string",
                        "enum": [
                          "string",
                          "boolean",
                          "any",
                          "number"
                        ]
                      },
                      "name": {
                        "type": "string",
                        "description": "Variable name"
                      },
                      "description": {
                        "$schema": "http://json-schema.org/draft-04/schema#",
                        "id": "#/definitions/description",
                        "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                        "oneOf": [
                          {
                            "type": "object",
                            "title": "Description",
                            "properties": {
                              "content": {
                                "type": "string",
                                "description": "The content of the description goes here, as a raw string."
                              },
                              "type": {
                                "type": "string",
                                "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                              },
                              "version": {
                                "description": "Description can have versions associated with it, which should be put in this property."
                              }
                            }
                          },
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "system": {
                        "type": "boolean",
                        "default": false,
                        "description": "When set to true, indicates that this variable has been set by Postman"
                      },
                      "disabled": {
                        "type": "boolean",
                        "default": false
                      }
                    },
                    "anyOf": [
                      {
                        "required": [
                          "id"
                        ]
                      },
                      {
                        "required": [
                          "key"
                        ]
                      },
                      {
                        "required": [
                          "id",
                          "key"
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "type": "string"
            }
          ]
        },
        "name": {
          "type": "string",
          "description": "Script name"
        }
      }
    },
    "url": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "description": "If object, contains the complete broken-down URL for this request. If string, contains the literal request URL.",
      "id": "#/definitions/url",
      "title": "Url",
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "raw": {
              "type": "string",
              "description": "The string representation of the request URL, including the protocol, host, path, hash, query parameter(s) and path variable(s)."
            },
            "protocol": {
              "type": "string",
              "description": "The protocol associated with the request, E.g: 'http'"
            },
            "host": {
              "title": "Host",
              "description": "The host for the URL, E.g: api.yourdomain.com. Can be stored as a string or as an array of strings.",
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "The host, split into subdomain strings."
                }
              ]
            },
            "path": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "type": "array",
                  "description": "The complete path of the current url, broken down into segments. A segment could be a string, or a path variable.",
                  "items": {
                    "oneOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "object",
                        "properties": {
                          "type": {
                            "type": "string"
                          },
                          "value": {
                            "type": "string"
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            },
            "port": {
              "type": "string",
              "description": "The port number present in this URL. An empty value implies 80/443 depending on whether the protocol field contains http/https."
            },
            "query": {
              "type": "array",
              "description": "An array of QueryParams, which is basically the query string part of the URL, parsed into separate variables",
              "items": {
                "type": "object",
                "title": "QueryParam",
                "properties": {
                  "key": {
                    "oneOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "value": {
                    "oneOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "disabled": {
                    "type": "boolean",
                    "default": false,
                    "description": "If set to true, the current query parameter will not be sent with the request."
                  },
                  "description": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/description",
                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                    "oneOf": [
                      {
                        "type": "object",
                        "title": "Description",
                        "properties": {
                          "content": {
                            "type": "string",
                            "description": "The content of the description goes here, as a raw string."
                          },
                          "type": {
                            "type": "string",
                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                          },
                          "version": {
                            "description": "Description can have versions associated with it, which should be put in this property."
                          }
                        }
                      },
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                }
              }
            },
            "hash": {
              "description": "Contains the URL fragment (if any). Usually this is not transmitted over the network, but it could be useful to store this in some cases.",
              "type": "string"
            },
            "variable": {
              "type": "array",
              "description": "Postman supports path variables with the syntax `/path/:variableName/to/somewhere`. These variables are stored in this field.",
              "items": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "id": "#/definitions/variable",
                "title": "Variable",
                "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
                "type": "object",
                "properties": {
                  "id": {
                    "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                    "type": "string"
                  },
                  "key": {
                    "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
                    "type": "string"
                  },
                  "value": {
                    "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
                  },
                  "type": {
                    "description": "A variable may have multiple types. This field specifies the type of the variable.",
                    "type": "string",
                    "enum": [
                      "string",
                      "boolean",
                      "any",
                      "number"
                    ]
                  },
                  "name": {
                    "type": "string",
                    "description": "Variable name"
                  },
                  "description": {
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "id": "#/definitions/description",
                    "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
                    "oneOf": [
                      {
                        "type": "object",
                        "title": "Description",
                        "properties": {
                          "content": {
                            "type": "string",
                            "description": "The content of the description goes here, as a raw string."
                          },
                          "type": {
                            "type": "string",
                            "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                          },
                          "version": {
                            "description": "Description can have versions associated with it, which should be put in this property."
                          }
                        }
                      },
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "system": {
                    "type": "boolean",
                    "default": false,
                    "description": "When set to true, indicates that this variable has been set by Postman"
                  },
                  "disabled": {
                    "type": "boolean",
                    "default": false
                  }
                },
                "anyOf": [
                  {
                    "required": [
                      "id"
                    ]
                  },
                  {
                    "required": [
                      "key"
                    ]
                  },
                  {
                    "required": [
                      "id",
                      "key"
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          "type": "string"
        }
      ]
    },
    "variable-list": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/variable-list",
      "title": "Variable List",
      "description": "Collection variables allow you to define a set of variables, that are a *part of the collection*, as opposed to environments, which are separate entities.\n*Note: Collection variables must not contain any sensitive information.*",
      "type": "array",
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "id": "#/definitions/variable",
        "title": "Variable",
        "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
        "type": "object",
        "properties": {
          "id": {
            "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
            "type": "string"
          },
          "key": {
            "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
            "type": "string"
          },
          "value": {
            "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
          },
          "type": {
            "description": "A variable may have multiple types. This field specifies the type of the variable.",
            "type": "string",
            "enum": [
              "string",
              "boolean",
              "any",
              "number"
            ]
          },
          "name": {
            "type": "string",
            "description": "Variable name"
          },
          "description": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "id": "#/definitions/description",
            "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
            "oneOf": [
              {
                "type": "object",
                "title": "Description",
                "properties": {
                  "content": {
                    "type": "string",
                    "description": "The content of the description goes here, as a raw string."
                  },
                  "type": {
                    "type": "string",
                    "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                  },
                  "version": {
                    "description": "Description can have versions associated with it, which should be put in this property."
                  }
                }
              },
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "system": {
            "type": "boolean",
            "default": false,
            "description": "When set to true, indicates that this variable has been set by Postman"
          },
          "disabled": {
            "type": "boolean",
            "default": false
          }
        },
        "anyOf": [
          {
            "required": [
              "id"
            ]
          },
          {
            "required": [
              "key"
            ]
          },
          {
            "required": [
              "id",
              "key"
            ]
          }
        ]
      }
    },
    "variable": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/variable",
      "title": "Variable",
      "description": "Using variables in your Postman requests eliminates the need to duplicate requests, which can save a lot of time. Variables can be defined, and referenced to from any part of a request.",
      "type": "object",
      "properties": {
        "id": {
          "description": "A variable ID is a unique user-defined value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
          "type": "string"
        },
        "key": {
          "description": "A variable key is a human friendly value that identifies the variable within a collection. In traditional terms, this would be a variable name.",
          "type": "string"
        },
        "value": {
          "description": "The value that a variable holds in this collection. Ultimately, the variables will be replaced by this value, when say running a set of requests from a collection"
        },
        "type": {
          "description": "A variable may have multiple types. This field specifies the type of the variable.",
          "type": "string",
          "enum": [
            "string",
            "boolean",
            "any",
            "number"
          ]
        },
        "name": {
          "type": "string",
          "description": "Variable name"
        },
        "description": {
          "$schema": "http://json-schema.org/draft-04/schema#",
          "id": "#/definitions/description",
          "description": "A Description can be a raw text, or be an object, which holds the description along with its format.",
          "oneOf": [
            {
              "type": "object",
              "title": "Description",
              "properties": {
                "content": {
                  "type": "string",
                  "description": "The content of the description goes here, as a raw string."
                },
                "type": {
                  "type": "string",
                  "description": "Holds the mime type of the raw description content. E.g: 'text/markdown' or 'text/html'.\nThe type is used to correctly render the description when generating documentation, or in the Postman app."
                },
                "version": {
                  "description": "Description can have versions associated with it, which should be put in this property."
                }
              }
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "system": {
          "type": "boolean",
          "default": false,
          "description": "When set to true, indicates that this variable has been set by Postman"
        },
        "disabled": {
          "type": "boolean",
          "default": false
        }
      },
      "anyOf": [
        {
          "required": [
            "id"
          ]
        },
        {
          "required": [
            "key"
          ]
        },
        {
          "required": [
            "id",
            "key"
          ]
        }
      ]
    },
    "version": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "id": "#/definitions/version",
      "title": "Collection Version",
      "description": "Postman allows you to version your collections as they grow, and this field holds the version number. While optional, it is recommended that you use this field to its fullest extent!",
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "major": {
              "description": "Increment this number if you make changes to the collection that changes its behaviour. E.g: Removing or adding new test scripts. (partly or completely).",
              "minimum": 0,
              "type": "integer"
            },
            "minor": {
              "description": "You should increment this number if you make changes that will not break anything that uses the collection. E.g: removing a folder.",
              "minimum": 0,
              "type": "integer"
            },
            "patch": {
              "description": "Ideally, minor changes to a collection should result in the increment of this number.",
              "minimum": 0,
              "type": "integer"
            },
            "identifier": {
              "description": "A human friendly identifier to make sense of the version numbers. E.g: 'beta-3'",
              "type": "string",
              "maxLength": 10
            },
            "meta": {}
          },
          "required": [
            "major",
            "minor",
            "patch"
          ]
        },
        {
          "type": "string"
        }
      ]
    }
  }
}