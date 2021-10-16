package com.hoovereats.mysql;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT u FROM User u WHERE u.uid = ?1")
	User findUserByUId(String uid);

	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User findUserByUsername(String username);

}
