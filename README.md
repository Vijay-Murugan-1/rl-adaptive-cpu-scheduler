# RL-Based Adaptive CPU Scheduler

A Reinforcement Learning based CPU Scheduling simulator that compares traditional scheduling algorithms with a PPO-based adaptive scheduler.

## Features

* FCFS Scheduling
* SJF Scheduling
* Round Robin Scheduling
* Priority Scheduling
* Custom Gymnasium Environment
* PPO Agent using Stable-Baselines3
* Performance Metrics:

  * Average Waiting Time
  * Average Turnaround Time
  * Throughput
  * Context Switch Count
* Gantt Chart Visualization
* Scheduler Comparison Graphs

## Tech Stack

* Python
* Gymnasium
* Stable-Baselines3
* NumPy
* Matplotlib

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

### Train PPO Agent

```bash
python -m rl_training.train_ppo
```

### Evaluate PPO Agent

```bash
python -m rl_training.evaluate_agent
```

### Compare RL vs Classical Schedulers

```bash
python -m rl_training.compare_rl_vs_classical
```

## Future Improvements

* Dynamic Process Arrivals
* Multi-Core Scheduling
* Advanced Reward Functions
* DQN and A2C Integration
* Interactive Dashboard

## Author

**Vijay**
