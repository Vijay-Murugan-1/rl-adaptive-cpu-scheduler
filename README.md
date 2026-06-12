# RL-Based Adaptive CPU Scheduler

A Reinforcement Learning based CPU Scheduling simulator that compares traditional CPU scheduling algorithms with PPO-based adaptive schedulers.

## Features

- FCFS (First Come First Serve)
- SJF (Shortest Job First)
- Round Robin
- Priority Scheduling
- SRTF (Shortest Remaining Time First)
- PPO-based Non-Preemptive Scheduler
- PPO-based Preemptive Scheduler
- Custom Gymnasium Environments
- Stable-Baselines3 Integration

## Performance Metrics

- Average Waiting Time
- Maximum Waiting Time
- Average Turnaround Time
- Throughput
- Context Switch Count

## Tech Stack

- Python
- Gymnasium
- Stable-Baselines3
- NumPy
- Matplotlib

## Project Structure

```text
core/
schedulers/
workloads/
rl_environment/
rl_training/
visualization/
experiments/
```

## Run the Project

### Compare Classical Schedulers

```bash
python -m experiments.compare_schedulers
```

### Train PPO Agent (Non-Preemptive)

```bash
python -m rl_training.train_ppo
```

### Evaluate PPO Agent

```bash
python -m rl_training.evaluate_agent
```

### Compare PPO vs Classical Schedulers

```bash
python -m rl_training.compare_rl_vs_classical
```

### Train PPO Agent (Preemptive)

```bash
python -m rl_training.train_ppo_preemptive
```

### Evaluate Preemptive PPO Agent

```bash
python -m rl_training.evaluate_preemptive_agent
```

### Compare PPO vs SRTF

```bash
python -m rl_training.compare_preemptive_rl_vs_srtf
```

## Current Results

### Non-Preemptive Environment

| Algorithm | Avg WT | Avg TAT |
|-----------|--------|---------|
| SJF | 10.7 | 18.9 |
| PPO | 10.7 | 18.9 |

PPO converged close to SJF after training.

### Preemptive Environment

| Algorithm | Avg WT | Avg TAT |
|-----------|--------|---------|
| SRTF | 5.8 | 14.0 |
| PPO | 10.1 | 18.3 |

PPO performance improved significantly through reward engineering and extended training.

## Future Work

- Fairness-Aware Reward Functions
- Starvation Reduction Strategies
- Multi-Core CPU Scheduling
- Dynamic Workload Generation
- DQN and A2C Implementations
- Interactive Dashboard

## Author

**Vijay**
