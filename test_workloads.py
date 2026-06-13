from workloads.generator import generate_workload

workloads = [
    "normal",
    "cpu_bound",
    "io_bound",
    "starvation",
    "mixed"
]

for workload in workloads:

    print("\n" + "=" * 40)
    print(workload.upper())
    print("=" * 40)

    processes = generate_workload(
        num_processes=10,
        seed=42,
        workload_type=workload
    )

    for p in processes:

        print(
            p.pid,
            p.arrival_time,
            p.burst_time,
            p.priority
        )