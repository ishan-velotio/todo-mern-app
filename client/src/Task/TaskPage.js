import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField } from "@material-ui/core";
import { Checkbox, Button } from "@material-ui/core";

class TaskPage extends Tasks {
	constructor(props) {
		super(props)
		this.state = {
			tasks: [],
			currentTask: "",
			...props
		};
	}
	render() {
		const { tasks, user } = this.state;

		const Task = ({ task, permissions }) => {
			return (
				<Paper key={task.id} className="flex task_container">
					{
						permissions.writeAccess && <Checkbox
							checked={task.completed}
							onClick={() => this.handleUpdate(task.id)}
							color="primary"
						/>
					}
					<div
						className={
							task.completed
								? "task line_through"
								: "task"
						}
					>
						{task.task}
					</div>
					{
						permissions.deleteAccess && <Button
							onClick={() => this.handleDelete(task.id)}
							color="secondary"
						>
							delete
						</Button>
					}
				</Paper>
			)
		}

		let todoform = null

		if (user.permissions.writeAccess) {
			todoform = (
				<form
					onSubmit={this.handleSubmit}
					className="flex"
					style={{ margin: "15px 0" }}
				>
					<TextField
						variant="outlined"
						size="small"
						style={{ width: "80%" }}
						value={this.state.currentTask}
						required={true}
						onChange={this.handleChange}
						placeholder="Add New TO-DO"
					/>
					<Button
						style={{ height: "40px" }}
						color="primary"
						variant="outlined"
						type="submit"
					>
						Add task
					</Button>
				</form>
			)
		}



		return (
			<div className="App flex">
				<Paper elevation={3} className="container">
					<div className="heading">TO-DO</div>
					{todoform}
					<div>
						{tasks.map((task) => (<Task
							key={task.id}
							task={task}
							permissions={user.permissions}
						/>)
						)}
					</div>
				</Paper>
			</div>
		);
	}
}

export default TaskPage