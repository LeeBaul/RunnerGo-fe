import React from "react";
import './index.less';
import ContrastHeader from './contrastHeader';
import ContrastDetail from './contrastDetail';

const ReportContrast = () => {

    const data  = {
        report_names: ["计划1/场景1", "计划2/场景2", "计划3/场景3", "计划4/场景4"],
        list1: [
            {
                report_id: 1,
                name: "计划1/场景1",
                performer: "liuguanglei",
                create_time_sec: "2022.11.11 11:11:11",
                task_type: 1,
                mode: 1,
                start_concurrency: 5,
                step: 5,
                step_run_time: 100,
                max_concurrency: 500,
                duration: 200,
                concurrency: 1000,
                reheat_time: 0,
                round_num: 5
            },
            {
                report_id: 2,
                name: "计划2/场景2",
                performer: "liuguanglei",
                create_time_sec: "2022.11.11 11:11:11",
                task_type: 1,
                mode: 1,
                start_concurrency: 5,
                step: 5,
                step_run_time: 100,
                max_concurrency: 500,
                duration: 200,
                concurrency: 1000,
                reheat_time: 0,
                round_num: 5
            },
            {
                report_id: 3,
                name: "计划3/场景3",
                performer: "liuguanglei",
                create_time_sec: "2022.11.11 11:11:11",
                task_type: 1,
                mode: 1,
                start_concurrency: 5,
                step: 5,
                step_run_time: 100,
                max_concurrency: 500,
                duration: 200,
                concurrency: 1000,
                reheat_time: 0,
                round_num: 5
            },
            {
                report_id: 4,
                name: "计划4/场景4",
                performer: "liuguanglei",
                create_time_sec: "2022.11.11 11:11:11",
                task_type: 1,
                mode: 1,
                start_concurrency: 5,
                step: 5,
                step_run_time: 100,
                max_concurrency: 500,
                duration: 200,
                concurrency: 1000,
                reheat_time: 0,
                round_num: 5
            }
        ],
        list2: [
            {
                name: "计划1/场景1",
                data: [
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    },
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    }
                ]
            },
            {
                name: "计划2/场景2",
                data: [
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    },
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    }
                ]
            },
            {
                name: "计划3/场景3",
                data: [
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    },
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    }
                ]
            },
            {
                name: "计划4/场景4",
                data: [
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    },
                    {
                        api_name: "新建接口",
                        total_request_num: 541200,
                        total_request_time: 47216.19,
                        max_request_time: 748.5,
                        min_request_time: 26.9,
                        avg_request_time: 87.1,
                        ninety_request_time_line_value: 150.5,
                        ninety_five_request_time_line_value: 169.5,
                        ninety_nine_request_time_line_value: 234.2,
                        qps: 11.48,
                        srps: 7.18,
                        error_rate: 0.37,
                        received_bytes: 0,
                        send_bytes: 0
                    }
                ]
            }
        ],
        list3: [
            {
                name: "计划1/场景2",
                time: "2022.11.11 12:23:22",
                data: {
                    api1: {
                        api_name: "接口1",
                        avg_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        qps_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        concurrency_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        error_num_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        fifty_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_five_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_nine_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ]
                    }
                }
            },
            {
                name: "计划1/场景2",
                time: "2022.11.11 12:23:22",
                data: {
                    api1: {
                        api_name: "接口1",
                        avg_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        qps_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        concurrency_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        error_num_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        fifty_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_five_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ],
                        ninety_nine_list: [
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            },
                            {
                                time_stamp: 1668134583,
                                value: 32.3
                            }
                        ]
                    }
                }
            },
        ],
        list4: [
            {
                name: "计划1/场景1/机器1",
                data: {
                    cpu: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    disk_io: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    mem: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    net_io: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ]
                }
            },
            {
                name: "计划2/场景2/机器2",
                data: {
                    cpu: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    disk_io: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    mem: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ],
                    net_io: [
                        [1668134582, 0.12],
                        [1668134582, 0.12],
                        [1668134582, 0.12]
                    ]
                }
            }
        ]
    }

    console.log(data);

    return (
        <div className="report-contrast">
            <ContrastHeader name={data.report_names} />
            <ContrastDetail list1={data.list1} list2={data.list2} list3={data.list3} list4={data.list4} />
        </div>
    )
};

export default ReportContrast;